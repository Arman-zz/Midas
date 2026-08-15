import { useMemo, useState } from 'react'
import PublicPage from '../../components/common/PublicPage'
import MarketplaceFilters from '../../components/marketplace/MarketplaceFilters'
import ProductGrid from '../../components/marketplace/ProductGrid'
import { filterProducts } from '../../services/productService'
import { useProducts } from '../../hooks/useProducts'
export default function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const { products: all, loading, error } = useProducts()
  const categories = ['All', ...new Set(all.map((p) => p.category))]
  const products = useMemo(() => filterProducts(all, { query, category }), [all, query, category])
  return (
    <PublicPage
      eyebrow="Marketplace"
      title="Jewelry from partner shops"
      intro="Every product shown here was uploaded by the shop named on its listing."
    >
      <MarketplaceFilters query={query} onQueryChange={(e) => setQuery(e.target.value)}>
        <div className="filter-scroll">
          {categories.map((value) => (
            <button
              key={value}
              className={`filter-chip ${category === value ? 'active' : ''}`}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </MarketplaceFilters>
      <ProductGrid products={products} />
      {loading && <div className="marketplace-empty">Loading products…</div>}
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      {!products.length && <div className="marketplace-empty">No jewelry matches your search.</div>}
    </PublicPage>
  )
}
