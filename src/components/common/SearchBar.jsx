export default function SearchBar({ value, onChange, placeholder = 'Search' }) {
  return <input className="field" type="search" value={value} onChange={onChange} placeholder={placeholder} />
}
