import { useMemo, useState } from 'react'
import MarketplaceFilters from '../../components/marketplace/MarketplaceFilters'
import ProductGrid from '../../components/marketplace/ProductGrid'
import ProductModal from '../../components/marketplace/ProductModal'
import { filterProducts } from '../../services/productService'
import { useProducts } from '../../hooks/useProducts'
export default function Marketplace({ globalSearch = '' }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const { products: all, loading, error } = useProducts()
  const categories = ['All', ...new Set(all.map((p) => p.category))]
  const products = useMemo(
    () => filterProducts(all, { query: globalSearch || query, category }),
    [all, globalSearch, query, category],
  )
  return (
    <>
      <div className="section-h">
        <div>
          <h2>Jewelry Marketplace</h2>
          <p className="lead">Products uploaded by partner shops.</p>
        </div>
      </div>
      <MarketplaceFilters query={query} onQueryChange={(e) => setQuery(e.target.value)}>
        <div className="filter-scroll">
          {categories.map((value) => (
            <button
              className={`filter-chip ${category === value ? 'active' : ''}`}
              onClick={() => setCategory(value)}
              key={value}
            >
              {value}
            </button>
          ))}
        </div>
      </MarketplaceFilters>
      <ProductGrid products={products} onSelect={setSelected} />
      {loading && <div className="marketplace-empty">Loading products…</div>}
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      {!products.length && <div className="marketplace-empty">No products match your search.</div>}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  )
}
