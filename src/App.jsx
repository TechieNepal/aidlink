import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './routes/Home.jsx'
import Discover from './routes/Discover.jsx'
import PostNeed from './routes/PostNeed.jsx'
import PostOffer from './routes/PostOffer.jsx'
import Safety from './routes/Safety.jsx'
import About from './routes/About.jsx'

export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <main id="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/post/need" element={<PostNeed />} />
          <Route path="/post/offer" element={<PostOffer />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

function NotFound(){
  return (
    <section className="container">
      <h1>Page Not Found</h1>
      <p>Try the <NavLink to="/discover">Discover</NavLink> page.</p>
    </section>
  )
}