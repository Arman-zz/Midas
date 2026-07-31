import ProductCard from '../cards/ProductCard'
export default function ProductGrid({ products = [], onSelect }) {
  return <div className="grid g-4">{products.map((product) => <ProductCard key={product.id} product={product} onSelect={onSelect} />)}</div>
}
