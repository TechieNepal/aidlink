export default function PostCard({ post, kind }) {
  return (
    <article className="card" aria-label={`${kind} ${post.title}`}>
      <header>
        <h3 style={{ marginTop: 0 }}>{post.title}</h3>
        <p className="muted">{prettyCategory(post.category)} · {post.locality}</p>
      </header>
      <p>{post.details}</p>
      <footer>
        <p className="muted">Contact hint: {post.contact_hint}</p>
      </footer>
    </article>
  )
}

function prettyCategory(c) { return c.charAt(0).toUpperCase() + c.slice(1) }