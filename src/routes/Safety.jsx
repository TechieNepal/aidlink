import { useI18n } from '../context/I18nContext'

export default function Safety(){
  const { t } = useI18n()
  return (
    <section className="container">
      <h1>{t('safety.title')}</h1>
      <div className="callout info"><strong>{t('safety.principle')}</strong></div>

      <h2>{t('safety.do')}</h2>
      <ul>{t('safety.doList').map((li, i) => <li key={i}>{li}</li>)}</ul>

      <h2>{t('safety.dont')}</h2>
      <ul>{t('safety.dontList').map((li, i) => <li key={i}>{li}</li>)}</ul>

      <h2>{t('safety.mod')}</h2>
      <p>{t('safety.modDesc')}</p>
    </section>
  )
}