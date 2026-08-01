import SearchBar from '../common/SearchBar'
export default function MarketplaceFilters({ query, onQueryChange, children }) {
  return (
    <div className="marketplace-controls">
      <SearchBar value={query} onChange={onQueryChange} placeholder="Search products" />
      {children}
    </div>
  )
}
