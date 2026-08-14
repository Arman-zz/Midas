import { installment, shops } from '../data/appData'

const KEY = 'midas-installment-plans'
const EVENT = 'midas:plans-updated'

const demoPlan = {
  id: 'plan-demo-0481',
  agreement: 'AG-2025-0481',
  customerKey: 'customer@midas.bd',
  customer: 'Midas Customer',
  productId: 'p-01',
  product: '22K Gold Necklace',
  shop: shops[0].name,
  targetGoldGrams: installment.targetGoldGrams,
  purity: '22K',
  amount: 125000,
  status: 'Active',
  requestedAt: '2025-04-01T00:00:00.000Z',
  approvedAt: '2025-04-02T00:00:00.000Z',
  legacySchedule: true,
}

function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (Array.isArray(saved)) return saved
  } catch {}
  localStorage.setItem(KEY, JSON.stringify([demoPlan]))
  return [demoPlan]
}

function write(plans) {
  localStorage.setItem(KEY, JSON.stringify(plans))
  window.dispatchEvent(new CustomEvent(EVENT))
  return plans
}

export function getPlans() {
  return read()
}

export function getCustomerPlans(customerKey) {
  const key = customerKey?.toLowerCase()
  return read().filter((plan) => plan.customerKey?.toLowerCase() === key)
}

export function getActiveCustomerPlan(customerKey) {
  return getCustomerPlans(customerKey).find((plan) => plan.status === 'Active') || null
}

export function getPendingCustomerPlan(customerKey) {
  return getCustomerPlans(customerKey).find((plan) => plan.status === 'Pending') || null
}

export function getCompletedPlanCount(customerKey) {
  return getCustomerPlans(customerKey).filter((plan) => plan.status === 'Completed').length
}

export function requestInstallmentPlan(product, user) {
  if (!user?.email) throw new Error('Please log in to request an installment plan')
  if (getActiveCustomerPlan(user.email))
    throw new Error('Finish your active plan before starting another')
  if (getPendingCustomerPlan(user.email))
    throw new Error('You already have a plan request awaiting review')
  const targetGoldGrams = Number.parseFloat(product.weight)
  if (!Number.isFinite(targetGoldGrams) || targetGoldGrams <= 0) {
    throw new Error('This product does not have a valid gold weight')
  }
  const plan = {
    id: `plan-${Date.now()}`,
    agreement: null,
    customerKey: user.email.toLowerCase(),
    customer: user.name,
    productId: product.id,
    product: product.name,
    shop: product.shop,
    targetGoldGrams,
    purity: product.purity,
    amount: Number(product.price),
    status: 'Pending',
    requestedAt: new Date().toISOString(),
  }
  write([plan, ...read()])
  return plan
}

export function decidePlanRequest(id, decision) {
  const plans = read()
  const requested = plans.find((plan) => plan.id === id)
  if (!requested || requested.status !== 'Pending')
    throw new Error('This request is no longer pending')
  if (decision === 'Approved') {
    const alreadyActive = plans.some(
      (plan) => plan.customerKey === requested.customerKey && plan.status === 'Active',
    )
    if (alreadyActive) throw new Error('This customer already has an active plan')
  }
  const now = new Date().toISOString()
  let updated
  write(
    plans.map((plan) => {
      if (plan.id !== id) return plan
      updated = {
        ...plan,
        status: decision === 'Approved' ? 'Active' : 'Rejected',
        agreement:
          decision === 'Approved'
            ? `AG-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
            : null,
        approvedAt: decision === 'Approved' ? now : undefined,
        rejectedAt: decision === 'Rejected' ? now : undefined,
      }
      return updated
    }),
  )
  return updated
}

export function completePlan(id) {
  const plans = read()
  const plan = plans.find((item) => item.id === id)
  if (!plan || plan.status !== 'Active') return plan || null
  const completed = { ...plan, status: 'Completed', completedAt: new Date().toISOString() }
  write(plans.map((item) => (item.id === id ? completed : item)))
  return completed
}

export const planEventName = EVENT
