import { useEffect, useRef, useState } from 'react'
import './styles/App.css'
import Header from './components/Header.jsx'
import Gallery from './components/Gallery.jsx'
import BuyBox from './components/BuyBox.jsx'
import DetailsAccordion from './components/DetailsAccordion.jsx'
import ReviewsSection from './components/ReviewsSection.jsx'
import RelatedProducts from './components/RelatedProducts.jsx'
import RecentlyViewed from './components/RecentlyViewed.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import { Toast, SizeGuideModal } from './components/Misc.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { PRODUCT, REVIEWS, RELATED_PRODUCTS, RECENTLY_VIEWED } from './data/products.js'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('kop-theme') || 'light')
  const [cartOpen, setCartOpen] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [toast, setToast] = useState({ message: '', visible: false })
  const toastTimer = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('kop-theme', theme)
  }, [theme])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  function showToast(message) {
    setToast({ message, visible: true })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2600)
  }

  return (
    <ErrorBoundary>
      <div id="top">
        <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} onOpenCart={() => setCartOpen(true)} />

        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="#top">Home</a> / <a href="#top">Men</a> / <a href="#top">Kits</a> / <span>{PRODUCT.name}</span>
        </nav>

        <main className="pdp-grid">
          <Gallery images={PRODUCT.images} productName={PRODUCT.name} />
          <BuyBox product={PRODUCT} onNotify={showToast} onSizeGuide={() => setSizeGuideOpen(true)} />
        </main>

        <div className="content-width">
          <DetailsAccordion product={PRODUCT} />
        </div>

        <div className="content-width">
          <ReviewsSection product={PRODUCT} reviews={REVIEWS} />
        </div>

        <RelatedProducts products={RELATED_PRODUCTS} onNotify={showToast} />
        <RecentlyViewed products={RECENTLY_VIEWED} />

        <footer className="site-footer">
          <div className="footer-newsletter">
            <h3>Join the list</h3>
            <p>New drops, restocks, and 10% off your first order.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                showToast('Thanks — check your inbox to confirm')
              }}
            >
              <input type="email" required placeholder="you@email.com" aria-label="Email address" />
              <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
          </div>
          <div className="footer-links">
            <div>
              <h4>Help</h4>
              <a href="#top">Orders</a>
              <a href="#top">Returns</a>
              <a href="#top">Shipping</a>
              <a href="#top">Gift Cards</a>
              <a href="#top">Store Locator</a>
            </div>
            <div>
              <h4>Shop</h4>
              <a href="#top">New arrivals</a>
              <a href="#top">Kits</a>
              <a href="#top">Training</a>
              <a href="#top">Membership</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#top">About</a>
              <a href="#top">Privacy</a>
              <a href="#top">Terms</a>
            </div>
            <div>
              <h4>Follow</h4>
              <div className="social-row">
                <a href="#top" aria-label="Instagram">IG</a>
                <a href="#top" aria-label="X / Twitter">X</a>
                <a href="#top" aria-label="TikTok">TT</a>
                <a href="#top" aria-label="Facebook">FB</a>
              </div>
            </div>
          </div>
          <p className="footer-copyright">
            Unofficial fan-made demo project. Not affiliated with, endorsed by, or sponsored by Liverpool FC, the Premier League, or any kit manufacturer. All photography is generic stock imagery.
          </p>
        </footer>

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onNotify={showToast} />
        <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
        <Toast message={toast.message} visible={toast.visible} />
      </div>
    </ErrorBoundary>
  )
}
