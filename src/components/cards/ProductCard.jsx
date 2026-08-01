import { formatCurrency } from '../../utils/format'
export default function ProductCard({ product, onSelect }) {
  return (
    <article className="product-card">
      <div className="product-thumb">
        <img className="product-photo" src={product.image} alt={product.name} />
        <button className="fav-btn" aria-label={`Save ${product.name}`}>
          ♡
        </button>
      </div>
      <div className="product-body">
        <div className="product-name">{product.name}</div>
        <div className="product-shop">{product.shop}</div>
        <div className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <div className="product-price mono">{formatCurrency(product.price)}</div>
        <div className="product-actions">
          <button
            className="btn btn-gold"
            disabled={!product.inStock}
            onClick={() => onSelect?.(product)}
          >
            {product.inStock ? 'Installment' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  )
}
