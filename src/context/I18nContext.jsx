import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from '../i18n/en.json'
import ne from '../i18n/ne.json'

const LOCALE_KEY = 'aidlink:locale'
const MESSAGES = { en, ne }

const I18nContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (k, vars) => k
})

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(LOCALE_KEY) || 'en')

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, lang)
    // keep <html lang="..."> updated for screen readers & SEO
    document.documentElement.setAttribute('lang', lang)
    // dir could be 'rtl' for certain langs; Nepali is LTR
    document.documentElement.setAttribute('dir', 'ltr')
  }, [lang])

  const t = useMemo(() => {
    const dict = MESSAGES[lang] || MESSAGES.en
    return (key, vars = {}) => {
      const raw = key.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), dict)
      const str = (raw == null ? key : String(raw))
      return str.replace(/\{\{(\w+)\}\}/g, (_, v) => vars[v] ?? '')
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(){ return useContext(I18nContext) }