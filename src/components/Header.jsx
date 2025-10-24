import { NavLink } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header(){
  const { t } = useI18n()
  return (
    <header>
      <div className="container" role="navigation" aria-label="Primary">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem'}}>
          <a href="/" style={{fontWeight:700, fontSize:'1.1rem'}} aria-label="AidLink Home">AidLink</a>
          <nav aria-label="Main">
            <NavLink to="/" end>{t('nav.home')}</NavLink>
            <NavLink to="/discover">{t('nav.discover')}</NavLink>
            <NavLink to="/post/need">{t('nav.postNeed')}</NavLink>
            <NavLink to="/post/offer">{t('nav.postOffer')}</NavLink>
            <NavLink to="/safety">{t('nav.safety')}</NavLink>
            <NavLink to="/about">{t('nav.about')}</NavLink>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}