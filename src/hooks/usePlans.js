import { useApiResource } from './useApiResource'
import { midasApi } from '../services/midasApi'

function normalize(plan) {
  return {
    ...plan,
    id: Number(plan.id),
    amount: Number(plan.amount),
    targetGoldGrams: Number(plan.targetGoldGrams),
    goldOwned: Number(plan.goldOwned),
    spent: Number(plan.spent),
    progress: Number(plan.progress),
    status: `${plan.status[0].toUpperCase()}${plan.status.slice(1)}`,
  }
}

export function usePlans() {
  const resource = useApiResource(() => midasApi.plans().then((plans) => plans.map(normalize)), [])
  return { ...resource, plans: resource.data || [] }
}
