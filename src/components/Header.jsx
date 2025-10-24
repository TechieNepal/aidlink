import { NavLink } from 'react-router-dom'

export default function Header(){
  return (
    <header>
      <div className="container" role="navigation" aria-label="Primary">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem'}}>
          <a href="/" style={{fontWeight:700,fontSize:'1.1rem'}} aria-label="AidLink Home">AidLink</a>
          <nav>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/discover">Discover</NavLink>
            <NavLink to="/post/need">Post Need</NavLink>
            <NavLink to="/post/offer">Offer Help</NavLink>
            <NavLink to="/safety">Safety</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}