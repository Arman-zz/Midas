import { formatCurrency } from '../../utils/format'
export default function ListingCard({ listing }) {
  return (
    <article className="card c2c-listing-card">
      <img className="product-photo" src={listing.image} alt={listing.title} />
      <div className="card-pad c2c-listing-body">
        <span className="badge badge-muted">Jewelry</span>
        <strong>{listing.title}</strong>
        <p className="c2c-seller">{listing.seller}</p>
        <p className="c2c-area">{listing.area}</p>
        <div className="c2c-listing-footer">
          <b>{formatCurrency(listing.price)}</b>
          <button className="btn btn-gold btn-sm">Send Inquiry</button>
        </div>
      </div>
    </article>
  )
}
