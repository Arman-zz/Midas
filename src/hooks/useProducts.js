import { useApiResource } from './useApiResource'
import { midasApi } from '../services/midasApi'

export function useProducts(query = '') {
  const resource = useApiResource(
    () =>
      midasApi.products(query).then((items) =>
        items.map((item) => ({
          ...item,
          id: Number(item.id),
          price: Number(item.price),
          weightGrams: Number(item.weightGrams),
        })),
      ),
    [query],
  )
  return { ...resource, products: resource.data || [] }
}
