import { useEffect, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { CATEGORIES } from '../data/schema'
import { validatePostFields, makeIdFromTitle } from '../utils/validators'
import { analyzeSafety } from '../utils/moderation'
import { TextInput, Select, TextArea } from './FormControls'
import PrivacyTips from './PrivacyTips'
import RedFlagList from './RedFlagList'
import PostCard from './PostCard'
import { buildShareUrl, copyText, downloadJson } from '../utils/share'
import { useI18n } from '../context/I18nContext'

export default function PostForm({ kind, draftKey }){
  const { t } = useI18n()
  const [draft, setDraft] = useLocalStorage(draftKey, {
    title: '', category: '', details: '', locality: '', contact_hint: ''
  })
  const [touched, setTouched] = useState(false)
  const { errors } = useMemo(() => validatePostFields(draft), [draft])
  const safety = useMemo(() => analyzeSafety(draft), [draft])
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
    <form className="card" onSubmit={onValidateSave} noValidate aria-labelledby="form-title">
      <h2 id="form-title" style={{marginTop:0}}>{kind === 'need' ? t('forms.createNeed') : t('forms.createOffer')}</h2>
      <div className="callout info" style={{marginBottom:'.75rem'}}>{t('forms.privacyTips')}</div>

      <Select
        id="category"
        label={t('forms.category')}
        value={draft.category}
        onChange={onChange('category')}
        options={CATEGORIES}
        error={touched ? errors.category : undefined}
        required
      />
      <TextInput
        id="title"
        label={t('forms.title')}
        value={draft.title}
        onChange={onChange('title')}
        placeholder={kind === 'need' ? t('forms.needTitlePh') : t('forms.offerTitlePh')}
        error={touched ? errors.title : undefined}
        required
      />
      <TextArea
        id="details"
        label={t('forms.details')}
        value={draft.details}
        onChange={onChange('details')}
        placeholder={kind === 'need' ? t('forms.needDetailsPh') : t('forms.offerDetailsPh')}
        rows={6}
        error={touched ? errors.details : undefined}
        required
      />
      <TextInput
        id="locality"
        label={t('forms.locality')}
        value={draft.locality}
        onChange={onChange('locality')}
        placeholder="Irving, TX"
        error={touched ? errors.locality : undefined}
        required
      />
      <TextInput
        id="contact_hint"
        label={t('forms.contactHint')}
        value={draft.contact_hint}
        onChange={onChange('contact_hint')}
        placeholder={t('forms.contactPh')}
        error={touched ? errors.contact_hint : undefined}
        required
      />

      <RedFlagList pii={safety.pii} scam={safety.scam} score={safety.score} />

      <div style={{display:'flex', gap:'.5rem', flexWrap:'wrap', marginTop:'.75rem'}}>
        <button type="submit">{t('forms.validateSave')}</button>
        <button type="button" onClick={()=>setTouched(true)}>{t('forms.checkErrors')}</button>
        <button type="button" onClick={onExportJson}>{t('forms.exportJson')}</button>
        <button type="button" onClick={onShareLink}>{t('forms.copyShare')}</button>
        <button type="button" onClick={onReset}>{t('forms.reset')}</button>
        <button type="button" onClick={onClearDraft} aria-label={t('forms.clearDraft')}>{t('forms.clearDraft')}</button>
        <span className="muted" aria-live="polite" style={{alignSelf:'center'}}>
          {savedAt ? t('forms.autosaved', { time: savedAt.toLocaleTimeString() }) : ''}
        </span>
      </div>

      <hr style={{margin:'1rem 0'}} />

      <h3>{t('forms.preview')}</h3>
      <p className="muted">{t('forms.previewDesc')}</p>
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