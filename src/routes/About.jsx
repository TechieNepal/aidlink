import { useI18n } from '../context/I18nContext'

export default function About(){
  const { t } = useI18n()
  return (
    <section className="container">
      <h1>{t('about.title')}</h1>
      <p>{t('about.body1')}</p>
      <p>{t('about.body2')}</p>
    </section>
  )
}