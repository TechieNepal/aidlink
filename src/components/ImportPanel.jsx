import { decodeBase64, safeFromJson } from '../utils/share'

export default function ImportPanel({ onImport }){
  /**
   * onImport(post) receives a validated object like:
   * {
   *   id, title, category, details, locality, contact_hint, created_at, _kind
   * }
   */
  async function importJson(e){
    e.preventDefault()
    const ta = document.getElementById('import-text')
    const text = ta.value.trim()
    if (!text) return
    const parsed = safeFromJson(text)
    if (!parsed.ok) return alert(parsed.reason)
    if (!parsed.value._kind) return alert('Missing "_kind" (need/offer).')
    onImport(parsed.value, { source: 'json' })
  }

  async function importLink(e){
    e.preventDefault()
    const ta = document.getElementById('import-text')
    const urlText = ta.value.trim()
    if (!urlText) return
    let url
    try { url = new URL(urlText) } catch { return alert('Not a valid URL') }
    const p = url.searchParams.get('p')
    if (!p) return alert('No "p" param in link')
    const dec = decodeBase64(p)
    if (!dec.ok) return alert(dec.reason)
    const v = safeFromJson(JSON.stringify(dec.value))
    if (!v.ok) return alert(v.reason)
    if (!v.value._kind) return alert('Missing "_kind" (need/offer).')
    onImport(v.value, { source: 'link' })
  }

  return (
    <div className="card" style={{marginBottom:'1rem'}}>
      <h2 style={{marginTop:0}}>Import</h2>
      <p className="muted">Paste a **share link** or **JSON** below to add a read-only post to your local view.</p>
      <textarea id="import-text" rows={4} style={{width:'100%', padding:'.6rem .8rem', border:'1px solid #d0d7de', borderRadius:'.6rem'}} placeholder="Paste share link or JSON here..."></textarea>
      <div style={{display:'flex', gap:'.5rem', marginTop:'.5rem', flexWrap:'wrap'}}>
        <button onClick={importLink}>Import from Link</button>
        <button onClick={importJson}>Import from JSON</button>
      </div>
    </div>
  )
}