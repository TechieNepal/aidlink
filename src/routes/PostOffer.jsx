import PostForm from '../components/PostForm'

export default function PostOffer(){
  return (
    <section className="container">
      <h1>Offer Help</h1>
      <PostForm kind="offer" draftKey="draft:offer" />
    </section>
  )
}