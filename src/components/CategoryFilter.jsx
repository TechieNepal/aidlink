import { CATEGORIES } from '../data/schema'

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="category-filter">
      <label htmlFor="category" className="visually-hidden">Category</label>
      <select id="category" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
        ))}
      </select>
    </div>
  )
}