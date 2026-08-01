import { confirmations, installment } from '../data/appData'

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
        saveGroups(normalized)
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
    date: record.date,
    recordedBy: record.recordedBy || 'Shop',
  })
  saveGroups(groups)
  return group
}
