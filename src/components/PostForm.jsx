import { useEffect, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { CATEGORIES } from '../data/schema'
import { validatePostFields, makeIdFromTitle } from '../utils/validators'
import { TextInput, Select, TextArea } from './FormControls'
import PostCard from './PostCard'
import { buildShareUrl, copyText, downloadJson } from '../utils/share'

/**
 * Generic PostForm for Need/Offer (same fields, different defaults).
 * @param {{kind: 'need' | 'offer', draftKey: string}} props
 */
export default function PostForm({ kind, draftKey }){
  const [draft, setDraft] = useLocalStorage(draftKey, {
    title: '',
    category: '',
    details: '',
    locality: '',
    contact_hint: '',
  })
  const [touched, setTouched] = useState(false)
  const { errors, flags } = useMemo(() => validatePostFields(draft), [draft])

  const [savedAt, setSavedAt] = useState(null)
  useEffect(() => { setSavedAt(new Date()) }, [draft])

  const onChange = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }))
  const onReset  = () => { setDraft({ title:'', category:'', details:'', locality:'', contact_hint:'' }); setTouched(false) }
  const onClearDraft = () => { localStorage.removeItem(draftKey); onReset() }

  function buildPayload(){
    return {
      id: makeIdFromTitle(draft.title),
      title: draft.title.trim(),
      category: draft.category,
      details: draft.details.trim(),
      locality: draft.locality.trim(),
      contact_hint: draft.contact_hint.trim(),
      created_at: new Date().toISOString(),
      _kind: kind
    }
  }

  const onValidateSave = (e) => {
    e.preventDefault()
    setTouched(true)
    if (Object.keys(errors).length === 0){
      const payload = buildPayload()
      try { localStorage.setItem(`${draftKey}:submitted`, JSON.stringify(payload)) } catch {}
      alert('Validated and saved locally. (Export & Share available below.)')
    } else {
      document.querySelector('[aria-invalid="true"]')?.focus()
    }
  }

  const onExportJson = () => {
    setTouched(true)
    if (Object.keys(errors).length > 0) return
    const payload = buildPayload()
    downloadJson(`${payload._kind}-${payload.id}.json`, payload)
  }

  const onShareLink = async () => {
    setTouched(true)
    if (Object.keys(errors).length > 0) return
    const payload = buildPayload()
    const url = buildShareUrl(location.origin, payload)
    const ok = await copyText(url)
    alert(ok ? 'Share link copied to clipboard!' : `Share URL:\n${url}`)
  }

  return (
    <form className="card" onSubmit={onValidateSave} noValidate>
      <h2 style={{marginTop:0}}>{kind === 'need' ? 'Create a Need' : 'Create an Offer'}</h2>
      <p className="muted">
        Do not include email, phone, exact address, or links. Share specifics only after trust is established.
      </p>

      <Select
        id="category"
        label="Category"
        value={draft.category}
        onChange={onChange('category')}
        options={CATEGORIES}
        error={touched ? errors.category : undefined}
        required
      />
      <TextInput
        id="title"
        label="Title"
        value={draft.title}
        onChange={onChange('title')}
        placeholder={kind === 'need' ? 'Ride to clinic on Tuesday' : 'Offer: Nepali ↔ English translation'}
        error={touched ? errors.title : undefined}
        required
      />
      <TextArea
        id="details"
        label="Details"
        value={draft.details}
        onChange={onChange('details')}
        placeholder={kind === 'need'
          ? 'General time window, meeting area, any constraints. No personal contact info.'
          : 'What you can offer, rough availability, meeting area. No personal contact info.'}
        rows={6}
        error={touched ? errors.details : undefined}
        required
      />
      <TextInput
        id="locality"
        label="General area"
        value={draft.locality}
        onChange={onChange('locality')}
        placeholder="Irving, TX"
        error={touched ? errors.locality : undefined}
        required
      />
      <TextInput
        id="contact_hint"
        label="Contact hint"
        value={draft.contact_hint}
        onChange={onChange('contact_hint')}
        placeholder="Reply via community admin; meet at public library"
        error={touched ? errors.contact_hint : undefined}
        required
      />

      {flags.length > 0 && (
        <div className="card" style={{background:'#fff9e6', borderColor:'#ffe08a', marginTop:'.75rem'}}>
          <strong>Privacy hints:</strong>
          <ul style={{marginTop:'.5rem'}}>
            {flags.map((f,i)=><li key={i}>{f}</li>)}
          </ul>
        </div>
      )}

      <div style={{display:'flex', gap:'.5rem', flexWrap:'wrap', marginTop:'.75rem'}}>
        <button type="submit">Validate & Save Locally</button>
        <button type="button" onClick={()=>setTouched(true)}>Check Errors</button>
        <button type="button" onClick={onExportJson}>Export JSON</button>
        <button type="button" onClick={onShareLink}>Copy Share Link</button>
        <button type="button" onClick={onReset}>Reset Fields</button>
        <button type="button" onClick={onClearDraft} aria-label="Clear saved draft">Clear Draft</button>
        <span className="muted" aria-live="polite" style={{alignSelf:'center'}}>
          {savedAt ? `Autosaved ${savedAt.toLocaleTimeString()}` : ''}
        </span>
      </div>

      <hr style={{margin:'1rem 0'}} />

      <h3>Preview</h3>
      <p className="muted">This is how your post will look in the Discover list.</p>
      <PostCard
        kind={kind === 'need' ? 'Need' : 'Offer'}
        post={{
          title: draft.title || '(Untitled)',
          category: draft.category || 'other',
          details: draft.details || 'Details will appear here.',
          locality: draft.locality || 'Your area',
          contact_hint: draft.contact_hint || 'Non-identifying contact hint'
        }}
      />
    </form>
  )
}