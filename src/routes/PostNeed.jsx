import PostForm from '../components/PostForm'

export default function PostNeed(){
  return (
    <section className="container">
      <h1>Post a Need</h1>
      <PostForm kind="need" draftKey="draft:need" />
    </section>
  )
}