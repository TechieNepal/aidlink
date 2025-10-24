import { useEffect, useMemo, useState } from 'react'
import needs from '../data/needs.json'
import offers from '../data/offers.json'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import Tabs from '../components/Tabs.jsx'
import PostCard from '../components/PostCard.jsx'
import { matchPost } from '../utils/fuzzy'
import ImportPanel from '../components/ImportPanel.jsx'
import { decodeBase64 } from '../utils/share'
import { validatePost } from '../data/schema'

export default function Discover() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [tab, setTab] = useState(0) // 0 = needs, 1 = offers

  // Imported (read-only) posts live only in this browser
  const [imported, setImported] = useState(() => {
    try { return JSON.parse(localStorage.getItem('imported:posts')) ?? [] } catch { return [] }
  })

  useEffect(() => { window.scrollTo(0, 0) }, [tab])

  // Parse ?p=... share param on first load
  useEffect(() => {
    const p = new URLSearchParams(location.search).get('p')
    if (!p) return
    const dec = decodeBase64(p)
    if (!dec.ok) return
    const v = validatePost(dec.value)
    if (!v.ok) return
    // Avoid duplicates by id
    setImported((prev) => {
      if (prev.some(x => x.id === dec.value.id)) return prev
      const next = [...prev, dec.value]
      try { localStorage.setItem('imported:posts', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  useEffect(() => {
    try { localStorage.setItem('imported:posts', JSON.stringify(imported)) } catch {}
  }, [imported])

  function handleImport(post /*, meta*/){
    setImported((prev) => {
      if (prev.some(x => x.id === post.id)) return prev
      const next = [...prev, post]
      try { localStorage.setItem('imported:posts', JSON.stringify(next)) } catch {}
      return next
    })
    alert('Imported! (read-only, local to this browser)')
  }

  // Merge built-in + imported by kind
  const importedNeeds  = imported.filter(p => p._kind === 'need')
  const importedOffers = imported.filter(p => p._kind === 'offer')

  const allNeeds  = useMemo(() => [...needs,  ...importedNeeds],  [imported, needs])
  const allOffers = useMemo(() => [...offers, ...importedOffers], [imported, offers])

  const filteredNeeds  = useMemo(() => allNeeds.filter(n => matchPost(n, q, category)),  [q, category, allNeeds])
  const filteredOffers = useMemo(() => allOffers.filter(o => matchPost(o, q, category)), [q, category, allOffers])

  return (
    <section className="container">
      <h1>Discover</h1>
      <p className="muted">Browse local <strong>needs</strong> and <strong>offers</strong>. Imported posts are read-only and stored locally.</p>

      <div className="toolbar" style={{display:'flex', gap:'.5rem', flexWrap:'wrap', alignItems:'center'}}>
        <SearchBar value={q} onChange={setQ} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <ImportPanel onImport={handleImport} />

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