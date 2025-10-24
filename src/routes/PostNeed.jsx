import PostForm from '../components/PostForm'
import { useI18n } from '../context/I18nContext'

export default function PostNeed(){
  const { t } = useI18n()
  return (
    <section className="container" aria-labelledby="post-need-title">
      <h1 id="post-need-title">{t('nav.postNeed')}</h1>
      <PostForm kind="need" draftKey="draft:need" />
    </section>
  )
}