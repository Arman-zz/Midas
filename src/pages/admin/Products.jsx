import ProductGrid from '../../components/marketplace/ProductGrid'
import { useProducts } from '../../hooks/useProducts'
export default function Products({ globalSearch = '' }) {
  const { products: all, loading, error } = useProducts()
  const products = all.filter((p) =>
    `${p.name} ${p.shop}`.toLowerCase().includes(globalSearch.toLowerCase()),
  )
  return (
    <>
      <div className="section-h">
        <div>
          <h2>Marketplace Products</h2>
          <p className="lead">Products uploaded by recognized partner shops.</p>
        </div>
      </div>
      <ProductGrid products={products} />
      {loading && <div className="shop-filter-empty">Loading products…</div>}
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
    </>
  )
}
