import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export default function RelatedProducts({ products, onNotify }) {
  const cart = useCart()
  const [wishlist, setWishlist] = useState(() => new Set())
  const [quickView, setQuickView] = useState(null)

  function toggleWishlist(p) {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(p.id)) next.delete(p.id)
      else {
        next.add(p.id)
        onNotify(`Added ${p.name} to your wishlist`)
      }
      return next
    })
  }

  function quickAdd(p) {
    cart.addItem({ key: `${p.id}-M`, productId: p.id, name: p.name, size: 'M', price: p.price, image: p.image, quantity: 1 })
    onNotify(`Added ${p.name} to your bag`)
  }

  return (
    <section className="related-section">
      <h2>You Might Also Like</h2>
      <div className="related-rail">
        {products.map((p) => (
          <article className="related-card" key={p.id}>
            <div className="related-card-media">
              <img src={p.image} alt={p.name} loading="lazy" />
              <div className="related-card-hover">
                <button type="button" className="btn-icon" aria-label="Wishlist" onClick={() => toggleWishlist(p)}>
                  {wishlist.has(p.id) ? '♥' : '♡'}
                </button>
                <button type="button" className="btn-icon" aria-label="Quick view" onClick={() => setQuickView(p)}>
                  👁
                </button>
              </div>
              <button type="button" className="related-quick-add" onClick={() => quickAdd(p)}>
                Quick Add
              </button>
            </div>
            <p className="related-card-name">{p.name}</p>
            <p className="related-card-price">{fmt(p.price)}</p>
          </article>
        ))}
      </div>

      {quickView && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setQuickView(null)}>
          <div className="modal-card modal-card-wide" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setQuickView(null)} aria-label="Close">✕</button>
            <div className="quickview-grid">
              <img src={quickView.image} alt={quickView.name} />
              <div>
                <h3>{quickView.name}</h3>
                <p className="reviews-score-num" style={{ fontSize: 18 }}>{fmt(quickView.price)}</p>
                <p>★ {quickView.rating}</p>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    quickAdd(quickView)
                    setQuickView(null)
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
