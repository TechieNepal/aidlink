import { useRef } from 'react'
import { useI18n } from '../context/I18nContext'

export default function LanguageSwitcher(){
  const { lang, setLang, t } = useI18n()
  const btnRef = useRef(null)

  function onChange(e){
    setLang(e.target.value)
    // keep focus where user was to reduce confusion
    btnRef.current?.focus()
  }

  return (
    <label aria-label="Language" style={{display:'inline-flex', alignItems:'center', gap:'.4rem'}}>
      <span className="visually-hidden">{t('a11y.skip')}</span>
      <select ref={btnRef} value={lang} onChange={onChange} aria-label="Language" title="Language">
        <option value="en">EN</option>
        <option value="ne">NE</option>
      </select>
    </label>
  )
}