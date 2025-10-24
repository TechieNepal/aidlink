import { useEffect, useMemo, useState } from 'react'
import needs from '../data/needs.json'
import offers from '../data/offers.json'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import Tabs from '../components/Tabs.jsx'
import PostCard from '../components/PostCard.jsx'
import { matchPost } from '../utils/fuzzy'

export default function Discover() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [tab, setTab] = useState(0) // 0 = needs, 1 = offers

  useEffect(() => { window.scrollTo(0, 0) }, [tab])

  const filteredNeeds = useMemo(() => needs.filter(n => matchPost(n, q, category)), [q, category])
  const filteredOffers = useMemo(() => offers.filter(o => matchPost(o, q, category)), [q, category])

  return (
    <section className="container">
      <h1>Discover</h1>
      <p className="muted">Browse local <strong>needs</strong> and <strong>offers</strong>. Avoid sharing personal contact details publicly.</p>

      <div className="toolbar" style={{display:'flex', gap:'.5rem', flexWrap:'wrap', alignItems:'center'}}>
        <SearchBar value={q} onChange={setQ} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <Tabs
        initialIndex={0}
        onChange={setTab}
        tabs={[
          { id:'needs',  label:`Needs (${filteredNeeds.length})`,  content: <List posts={filteredNeeds}  kind="Need"  emptyCta="Be the first to post a need." /> },
          { id:'offers', label:`Offers (${filteredOffers.length})`, content: <List posts={filteredOffers} kind="Offer" emptyCta="Be the first to offer help." /> }
        ]}
      />
    </section>
  )
}

function List({ posts, kind, emptyCta }) {
  if (!posts.length) {
    return (
      <div className="card" role="status">
        <h2>No {kind.toLowerCase()}s found</h2>
        <p>{emptyCta}</p>
      </div>
    )
  }
  return (
    <div className="grid" aria-live="polite">
      {posts.map(p => <PostCard key={p.id} post={p} kind={kind} />)}
    </div>
  )
}