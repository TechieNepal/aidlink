import { NavLink } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'

export default function Home(){
  const { t } = useI18n()
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{t('home.heroTitle')}</h1>
          <p>{t('home.heroSubtitle')}</p>
          <p style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
            <NavLink to="/post/need">{t('home.btnPostNeed')}</NavLink>
            <NavLink to="/post/offer">{t('home.btnPostOffer')}</NavLink>
            <NavLink to="/discover">{t('home.btnBrowse')}</NavLink>
          </p>
        </div>
      </section>
      <section className="container">
        <div className="grid">
          <div className="card">
            <h2>{t('home.privacy')}</h2>
            <p>{t('home.privacyDesc')}</p>
          </div>
          <div className="card">
            <h2>{t('home.micro')}</h2>
            <p>{t('home.microDesc')}</p>
          </div>
          <div className="card">
            <h2>{t('home.i18nReady')}</h2>
            <p>{t('home.i18nReadyDesc')}</p>
          </div>
        </div>
      </section>
    </>
  )
}