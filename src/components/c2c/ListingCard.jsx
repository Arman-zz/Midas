import { formatCurrency } from '../../utils/format'
export default function ListingCard({ listing }) {
  return <article className="card">{listing.image && <img className="product-photo" src={listing.image} alt={listing.title} />}<div className="card-pad"><strong>{listing.title}</strong><p>{listing.area}</p><b>{formatCurrency(listing.price)}</b></div></article>
}
