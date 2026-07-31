import ListingCard from './ListingCard'
export default function ListingGrid({ listings = [] }) {
  return <div className="grid g-4">{listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
}
