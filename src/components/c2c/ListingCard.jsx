import { formatCurrency } from '../../utils/format'
export default function ListingCard({ listing }) {
  const isGoldWeight = listing.listingType === 'gold-weight'

  return (
    <article className="card c2c-listing-card">
      {listing.image ? (
        <img className="product-photo" src={listing.image} alt={listing.title} />
      ) : (
        <div
          className="gold-weight-visual"
          role="img"
          aria-label={`${listing.weight} grams of ${listing.purity} gold`}
        >
          <span className="gold-weight-value">
            <small>GOLD AMOUNT</small>
            {listing.weight} g
          </span>
          <span className="gold-purity-mark">{listing.purity}</span>
        </div>
      )}
      <div className="card-pad c2c-listing-body">
        <span className={`badge ${isGoldWeight ? 'badge-gold' : 'badge-muted'}`}>
          {isGoldWeight ? 'Gold by Weight' : 'Jewelry'}
        </span>
        <strong>{listing.title}</strong>
        {isGoldWeight && (
          <div className="c2c-gold-details">
            <span>
              <small>Weight</small>
              <b>{listing.weight} g</b>
            </span>
            <span>
              <small>Purity</small>
              <b>{listing.purity}</b>
            </span>
          </div>
        )}
        <p className="c2c-seller">{listing.seller}</p>
        <p className="c2c-area">{listing.area}</p>
        <div className="c2c-listing-footer">
          <b>{formatCurrency(listing.price)}</b>
          <button className="btn btn-gold btn-sm">
            {isGoldWeight ? 'Buy Gold' : 'Send Inquiry'}
          </button>
        </div>
      </div>
    </article>
  )
}
