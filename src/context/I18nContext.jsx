import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from '../i18n/en.json'
import ne from '../i18n/ne.json'

const LOCALE_KEY = 'aidlink:locale'
const MESSAGES = { en, ne }

const I18nContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (k, vars) => k,    // returns raw (string/array/object) with interpolation only for strings
})

function resolve(dict, key) {
  return key.split('.').reduce((acc, k) => (acc != null ? acc[k] : undefined), dict)
}

function interpolate(str, vars) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, v) => (vars && v in vars ? String(vars[v]) : ''))
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(LOCALE_KEY) || 'en')

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, lang)
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', 'ltr')
  }, [lang])

  const t = useMemo(() => {
    const dict = MESSAGES[lang] || MESSAGES.en
    return (key, vars = {}) => {
      const raw = resolve(dict, key)
      if (raw == null) return key
      if (typeof raw === 'string') return interpolate(raw, vars)
      // For arrays/objects, return as-is (no interpolation)
      return raw
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(){ return useContext(I18nContext) }