import { useApiResource } from './useApiResource'
import { midasApi } from '../services/midasApi'

export function useShopProducts() {
  const resource = useApiResource(
    () =>
      midasApi.shopProducts().then((items) =>
        items.map((item) => ({
          ...item,
          id: Number(item.id),
          price: Number(item.price),
          weightGrams: Number(item.weightGrams),
        })),
      ),
    [],
  )
  return { ...resource, products: resource.data || [] }
}
