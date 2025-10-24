import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Connect help requests and offers — locally.</h1>
          <p>Post a small need or offer support. No accounts. No tracking. Just neighbors helping neighbors.</p>
          <p style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
            <NavLink to="/post/need">Post a Need</NavLink>
            <NavLink to="/post/offer">Offer Help</NavLink>
            <NavLink to="/discover">Browse</NavLink>
          </p>
        </div>
      </section>
      <section className="container">
        <div className="grid">
          <div className="card">
            <h2>Privacy-first</h2>
            <p>No login. You control what you share. Tips on staying safe are in the Safety page.</p>
          </div>
          <div className="card">
            <h2>Micro-actions</h2>
            <p>Requests are small and specific: rides, translations, tutoring, donated items.</p>
          </div>
          <div className="card">
            <h2>Multilingual-ready</h2>
            <p>International communities welcome. (i18n will land in a later PR.)</p>
          </div>
        </div>
      </section>
    </>
  )
}