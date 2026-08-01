import ProductGrid from '../../components/marketplace/ProductGrid'
import { getProducts } from '../../services/productService'
export default function Products({ globalSearch = '' }) {
  const products = getProducts().filter((p) =>
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
    </>
  )
}
