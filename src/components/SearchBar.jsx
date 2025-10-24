import { useId } from 'react'

export default function SearchBar({ value, onChange, placeholder = 'Search title, details, locality…' }) {
  const id = useId()
  return (
    <div className="searchbar">
      <label htmlFor={id} className="visually-hidden">Search</label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search posts"
      />
    </div>
  )
}