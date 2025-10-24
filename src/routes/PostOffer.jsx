import PostForm from '../components/PostForm'
import { useI18n } from '../context/I18nContext'

export default function PostOffer(){
  const { t } = useI18n()
  return (
    <section className="container" aria-labelledby="post-offer-title">
      <h1 id="post-offer-title">{t('nav.postOffer')}</h1>
      <PostForm kind="offer" draftKey="draft:offer" />
    </section>
  )
}