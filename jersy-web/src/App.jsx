import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { useCart } from './state/cart.js'
import { PRODUCT, COLORWAYS, SIZES } from './data/product.js'
import Gallery from './components/Gallery.jsx'
import ColorwaySelector from './components/ColorwaySelector.jsx'
import SizeDropdown from './components/SizeDropdown.jsx'
import QuantityDropdown from './components/QuantityDropdown.jsx'
import Accordion from './components/Accordion.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Toast from './components/Toast.jsx'
import SizeGuideModal from './components/SizeGuideModal.jsx'
import ReviewStars from './components/ReviewStars.jsx'
import {
  IconHeart,
  IconBag,
  IconSearch,
  IconTruck,
  IconReturn,
  IconShield,
  IconSpinner,
  IconCheck,
} from './components/icons.jsx'
import Header from "./components/header/header.jsx";

function App() {
  return (
    <>
      <Header />
      {/* Rest of your page */}
    </>
  );
}

export default App;
const formatMoney = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

function App() {
  const cart = useCart()

  const [colorwayId, setColorwayId] = useState(COLORWAYS[0].id)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [sizeInvalid, setSizeInvalid] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [wishPop, setWishPop] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [addState, setAddState] = useState('idle') // idle | loading | success
  const [toast, setToast] = useState({ message: '', visible: false })
  const [showStickyBar, setShowStickyBar] = useState(false)

  const toastTimer = useRef(null)
  const shakeTimer = useRef(null)
  const addToBagRef = useRef(null)

  const colorway = COLORWAYS.find((c) => c.id === colorwayId) ?? COLORWAYS[0]
  const stock = colorway.stock
  const maxQty = selectedSize ? Math.min(stock[selectedSize] ?? 0, 10) : 10

  // Some sizes sell out per-colorway. Both handlers below clamp the
  // size/quantity selection as part of the user action that caused the
  // change, rather than reacting to it after the fact in an effect.
  function handleColorwayChange(id) {
    setColorwayId(id)
    const next = COLORWAYS.find((c) => c.id === id)
    if (!next || !selectedSize) return
    const nextStock = next.stock[selectedSize] ?? 0
    if (nextStock === 0) {
      setSelectedSize(null)
      setSizeInvalid(false)
      setQuantity(1)
    } else {
      setQuantity((q) => Math.min(q, Math.min(nextStock, 10)))
    }
  }

  function handleSizeChange(size) {
    setSelectedSize(size)
    setSizeInvalid(false)
    const nextMax = Math.min(stock[size] ?? 0, 10)
    setQuantity((q) => Math.min(q, Math.max(nextMax, 1)))
  }

  useEffect(() => {
    const node = addToBagRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(
    () => () => {
      clearTimeout(toastTimer.current)
      clearTimeout(shakeTimer.current)
    },
    [],
  )

  function showToast(message) {
    clearTimeout(toastTimer.current)
    setToast({ message, visible: true })
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }))
    }, 2800)
  }

  function handleAddToBag() {
    if (!selectedSize) {
      setSizeInvalid(true)
      clearTimeout(shakeTimer.current)
      shakeTimer.current = setTimeout(() => setSizeInvalid(false), 600)
      return
    }
    setAddState('loading')
    setTimeout(() => {
      cart.addItem({
        productId: PRODUCT.id,
        title: PRODUCT.name,
        variantLabel: selectedSize,
        unitPrice: PRODUCT.price,
        imageSrc: { view: 'front', ...colorway.palette },
        quantity,
      })
      setAddState('success')
      showToast(`Added ${PRODUCT.name} (${selectedSize}) to your bag`)
      setTimeout(() => setAddState('idle'), 1400)
    }, 500)
  }

  function toggleWishlist() {
    setWishlisted((v) => !v)
    setWishPop(true)
    setTimeout(() => setWishPop(false), 400)
  }

  const cartCount = useMemo(() => cart.items.reduce((n, i) => n + i.quantity, 0), [cart.items])

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <span className="wordmark">LFC&nbsp;Store</span>
          <nav className="primary-nav" aria-label="Primary">
            <a href="#top">New</a>
            <a href="#top">Men</a>
            <a href="#top">Women</a>
            <a href="#top">Kids</a>
            <a href="#top">Sale</a>
          </nav>
          <div className="site-header-actions">
            <button type="button" className="icon-btn" aria-label="Search">
              <IconSearch />
            </button>
            <button
              type="button"
              className={`icon-btn ${wishPop ? 'pop' : ''}`}
              aria-label="Wishlist"
              onClick={toggleWishlist}
              aria-pressed={wishlisted}
            >
              <IconHeart filled={wishlisted} />
            </button>
            <button
              type="button"
              className="icon-btn cart-btn"
              aria-label={`Open bag, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
            >
              <IconBag />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <p className="breadcrumb">
          Home <span>/</span> Men <span>/</span> Liverpool FC <span>/</span>{' '}
          <span aria-current="page">{PRODUCT.name}</span>
        </p>

        <div className="pdp-grid">
          <Gallery palette={colorway.palette} name="PLAYER" number="11" />

          <section className="buy-box" aria-labelledby="product-title">
            {PRODUCT.badge && <span className="badge">{PRODUCT.badge}</span>}
            <h1 id="product-title">{PRODUCT.name}</h1>
            <p className="subtitle">{PRODUCT.subtitle}</p>

            <button
              type="button"
              className="rating-row"
              onClick={() =>
                document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <ReviewStars rating={PRODUCT.rating} />
              <span className="rating-count">
                {PRODUCT.rating} ({PRODUCT.ratingCount} reviews)
              </span>
            </button>

            <p className="price">{formatMoney(PRODUCT.price)}</p>

            <ColorwaySelector
              colorways={COLORWAYS}
              value={colorwayId}
              onChange={handleColorwayChange}
            />

            <SizeDropdown
              sizes={SIZES}
              stock={stock}
              value={selectedSize}
              onChange={handleSizeChange}
              onOpenSizeGuide={() => setSizeGuideOpen(true)}
              invalid={sizeInvalid}
            />

            <QuantityDropdown value={quantity} max={Math.max(maxQty, 1)} onChange={setQuantity} />

            <div className="buy-actions" ref={addToBagRef}>
              <button
                type="button"
                className={`btn btn-primary btn-add ${sizeInvalid ? 'shake' : ''} ${
                  addState !== 'idle' ? 'is-busy' : ''
                }`}
                onClick={handleAddToBag}
                disabled={addState !== 'idle'}
              >
                {addState === 'loading' && <IconSpinner className="spin" />}
                {addState === 'success' && <IconCheck />}
                {addState === 'loading'
                  ? 'Adding…'
                  : addState === 'success'
                    ? 'Added to bag'
                    : 'Add to Bag'}
              </button>
              <button
                type="button"
                className={`btn btn-outline btn-wish ${wishPop ? 'pop' : ''}`}
                onClick={toggleWishlist}
                aria-pressed={wishlisted}
              >
                <IconHeart filled={wishlisted} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>

            <p className="delivery-line">
              <IconTruck aria-hidden="true" /> {PRODUCT.delivery.estimate}
            </p>

            <ul className="trust-row">
              <li>
                <IconTruck aria-hidden="true" /> Free shipping
              </li>
              <li>
                <IconReturn aria-hidden="true" /> Free returns
              </li>
              <li>
                <IconShield aria-hidden="true" /> Secure checkout
              </li>
            </ul>

            <div className="accordion-list">
              <Accordion title="Product Details" defaultOpen>
                <p>{PRODUCT.description}</p>
                <ul className="bullet-list">
                  {PRODUCT.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Free Delivery and Returns">
                <p>{PRODUCT.delivery.estimate}.</p>
                <p>{PRODUCT.delivery.returns}.</p>
              </Accordion>

              <Accordion title="Size & Fit">
                <p>Regular fit — true to size. See the size guide for full measurements.</p>
                <button type="button" className="link-btn" onClick={() => setSizeGuideOpen(true)}>
                  Open size guide
                </button>
              </Accordion>

              <Accordion title={`Reviews (${PRODUCT.ratingCount})`}>
                <div id="reviews-section" className="reviews-summary">
                  <ReviewStars rating={PRODUCT.rating} size={18} />
                  <span>
                    {PRODUCT.rating} out of 5 · {PRODUCT.ratingCount} ratings
                  </span>
                </div>
                <ul className="review-list">
                  {PRODUCT.reviews.map((r) => (
                    <li key={r.id} className="review">
                      <div className="review-head">
                        <ReviewStars rating={r.rating} size={14} />
                        <span className="review-title">{r.title}</span>
                      </div>
                      <p className="review-body">{r.body}</p>
                      <p className="review-meta">
                        {r.author}
                        {r.verified ? ' · Verified purchase' : ''} ·{' '}
                        {new Date(r.date).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          </section>
        </div>
      </main>

      <div className={`sticky-bar ${showStickyBar ? 'is-visible' : ''}`}>
        <div className="sticky-bar-inner">
          <span className="sticky-bar-title">{PRODUCT.name}</span>
          <span className="sticky-bar-price">{formatMoney(PRODUCT.price)}</span>
          <button type="button" className="btn btn-primary" onClick={handleAddToBag}>
            {selectedSize ? `Add to Bag — ${selectedSize}` : 'Select a size'}
          </button>
        </div>
      </div>

      <footer className="site-footer">
        <p>Fan-made demo store. Not affiliated with any club or retailer.</p>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        rows={PRODUCT.sizeGuide}
      />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  )
}

export default App
