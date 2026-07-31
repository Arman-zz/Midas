import { formatCurrency } from '../../utils/format'
export default function ProductCard({ product, onSelect }) {
  return <article className="card product-card" onClick={() => onSelect?.(product)}>
    {product.image && <img className="product-photo" src={product.image} alt={product.name} />}
    <div className="card-pad"><strong>{product.name}</strong><p>{product.shop}</p><b>{formatCurrency(product.price)}</b></div>
  </article>
}
