import { confirmations, installment } from '../data/appData'
import { completePlan, getPlans } from './planService'

const KEY = 'midas-payment-records'

function seedGroups() {
  return confirmations.map((record, index) => ({
    customer: record.customer,
    agreement: record.agreement,
    product: record.product || 'Gold installment plan',
    payments: [
      {
        id: `seed-payment-${index}`,
        invoiceId: `INV-2025-${String(481 - index).padStart(4, '0')}`,
        amount: record.amount,
        goldRate: installment.currentTrendlineRate,
        goldAmount: record.amount / installment.currentTrendlineRate,
        date: record.date,
        recordedBy: 'Shop',
      },
    ],
  }))
}

function groupFlatRecords(records) {
  return records.reduce((groups, record) => {
    const agreement = record.agreement || `CUSTOMER-${record.customer}`
    let group = groups.find(
      (item) => item.customer === record.customer && item.agreement === agreement,
    )
    if (!group) {
      group = {
        customer: record.customer,
        agreement,
        product: record.product || 'Gold installment plan',
        payments: [],
      }
      groups.push(group)
    }
    group.payments.push({
      id: record.id || `migrated-${record.invoiceId}`,
      invoiceId: record.invoiceId,
      amount: Number(record.amount),
      goldRate: Number(record.goldRate) || installment.currentTrendlineRate,
      goldAmount:
        Number(record.goldAmount) ||
        Number(record.amount) / (Number(record.goldRate) || installment.currentTrendlineRate),
      date: record.date,
      recordedBy: record.recordedBy || 'Shop',
    })
    return groups
  }, [])
}

function saveGroups(groups) {
  localStorage.setItem(KEY, JSON.stringify(groups))
  window.dispatchEvent(new CustomEvent('midas:payments-updated'))
}

export function getPaymentGroups() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (Array.isArray(saved)) {
      if (!saved.length || Array.isArray(saved[0]?.payments)) {
        const normalized = saved.map((group) => ({
          ...group,
          payments: group.payments.map((payment) => {
            const goldRate = Number(payment.goldRate) || installment.currentTrendlineRate
            return {
              ...payment,
              goldRate,
              goldAmount: Number(payment.goldAmount) || Number(payment.amount) / goldRate,
            }
          }),
        }))
        return normalized
      }
      const migrated = groupFlatRecords(saved)
      saveGroups(migrated)
      return migrated
    }
  } catch {}
  const initial = seedGroups()
  saveGroups(initial)
  return initial
}

export function getPaymentRecords() {
  return getPaymentGroups().flatMap((group) =>
    group.payments.map((payment) => ({
      ...payment,
      customer: group.customer,
      agreement: group.agreement,
      product: group.product,
    })),
  )
}

export function addPaymentRecord(record) {
  const invoiceId = record.invoiceId.trim()
  const groups = getPaymentGroups()
  const duplicate = groups.some((group) =>
    group.payments.some((payment) => payment.invoiceId.toLowerCase() === invoiceId.toLowerCase()),
  )
  if (duplicate) throw new Error('This invoice ID has already been recorded')

  let group = groups.find(
    (item) => item.customer === record.customer && item.agreement === record.agreement,
  )
  if (!group) {
    group = {
      customer: record.customer,
      agreement: record.agreement,
      product: record.product,
      payments: [],
    }
    groups.unshift(group)
  }
  group.payments.unshift({
    id: `payment-${Date.now()}`,
    invoiceId,
    amount: Number(record.amount),
    goldRate: Number(record.goldRate),
    goldAmount: Number(record.goldAmount),
    goldRateSource: record.goldRateSource || 'Live market API',
    goldRateUpdatedAt: record.goldRateUpdatedAt || new Date().toISOString(),
    date: record.date,
    recordedBy: record.recordedBy || 'Shop',
  })
  saveGroups(groups)
  const plan = getPlans().find((item) => item.agreement === record.agreement)
  if (plan) {
    const summary = getCustomerPlanSummary(
      plan.customer,
      plan.targetGoldGrams,
      plan.agreement,
      plan,
    )
    if (summary.isComplete) completePlan(plan.id)
  }
  return group
}

export function getCustomerPlanSummary(customer, targetGoldGrams, agreement, plan) {
  const basePayments = (plan?.legacySchedule ? installment.schedule : [])
    .filter((row) => row.status === 'Confirmed' && row.goldRate)
    .map((row) => ({ ...row, goldAmount: row.amount / row.goldRate, source: 'schedule' }))
  const approvedPayments = getPaymentRecords()
    .filter(
      (row) =>
        !String(row.id).startsWith('seed-payment-') &&
        row.customer?.toLowerCase() === customer?.toLowerCase() &&
        (!agreement || row.agreement === agreement),
    )
    .map((row) => ({ ...row, source: 'shop-approval' }))
  const payments = [...basePayments, ...approvedPayments]
  const goldOwned = payments.reduce((sum, row) => sum + Number(row.goldAmount), 0)
  const spent = payments.reduce((sum, row) => sum + Number(row.amount), 0)
  const progress = targetGoldGrams > 0 ? Math.min(100, (goldOwned / targetGoldGrams) * 100) : 0
  return { payments, goldOwned, spent, progress, isComplete: progress >= 100 }
}
