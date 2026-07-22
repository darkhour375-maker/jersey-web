import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export default function BuyBox({ product, onNotify, onSizeGuide }) {
  const cart = useCart()
  const [size, setSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  function handleAddToBag() {
    if (!size) {
      setSizeError(true)
      return
    }
    cart.addItem({
      key: `${product.id}-${size}`,
      productId: product.id,
      name: product.name,
      size,
      price: product.price,
      image: product.images[0],
      quantity,
    })
    onNotify(`Added ${product.name} (${size}) to your bag`)
  }

  return (
    <div className="buybox">
      <p className="buybox-category">{product.category}</p>
      <h1 className="buybox-title">{product.name}</h1>
      <p className="buybox-team">{product.subtitle}</p>
      <p className="buybox-meta">Style {product.code} · <span className="stock-pill">{product.stock}</span></p>

      <div className="buybox-rating">
        <span aria-hidden="true">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
        <span className="buybox-rating-num">{product.rating}</span>
        <a href="#reviews" className="buybox-review-link">({product.reviewCount} reviews)</a>
      </div>

      <div className="buybox-price">
        <span className="price-sale">{fmt(product.price)}</span>
        <span className="price-original">{fmt(product.compareAtPrice)}</span>
        <span className="price-discount">{product.discountText}</span>
      </div>

      <div className="buybox-sizes">
        <div className="buybox-sizes-header">
          <span>Size</span>
          <button type="button" className="link-btn" onClick={onSizeGuide}>Size guide</button>
        </div>
        <div className={`size-grid ${sizeError ? 'has-error' : ''}`}>
          {product.sizes.map((s) => {
            const soldOut = product.outOfStockSizes.includes(s)
            return (
              <button
                key={s}
                type="button"
                disabled={soldOut}
                className={`size-chip ${size === s ? 'is-selected' : ''} ${soldOut ? 'is-soldout' : ''}`}
                onClick={() => {
                  setSize(s)
                  setSizeError(false)
                }}
              >
                {s}
              </button>
            )
          })}
        </div>
        {sizeError && <p className="size-error-text">Please select a size</p>}
      </div>

      <div className="buybox-qty">
        <span>Quantity</span>
        <div className="qty-stepper">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
          <span>{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => Math.min(10, q + 1))} aria-label="Increase quantity">+</button>
        </div>
      </div>

      <div className="buybox-actions">
        <button type="button" className="btn btn-primary btn-block" onClick={handleAddToBag}>
          Add to Bag
        </button>
        <button
          type="button"
          className="btn btn-outline btn-block"
          onClick={() => {
            handleAddToBag()
            onNotify('Buy Now is a demo — item added to your bag')
          }}
        >
          Buy Now
        </button>
      </div>
      <div className="buybox-actions buybox-actions-secondary">
        <button type="button" className="btn btn-primary btn-block" onClick={handleAddToBag}>
          Add to Bag
        </button>
        <button
          type="button"
          className={`btn btn-outline btn-wish ${wishlisted ? 'is-active' : ''}`}
          onClick={() => setWishlisted((v) => !v)}
          aria-pressed={wishlisted}
        >
          {wishlisted ? '♥' : '♡'} {wishlisted ? 'Wishlisted' : 'Wishlist'}
        </button>
        <button
          type="button"
          className="btn-icon"
          aria-label="Share"
          onClick={async () => {
            try {
              if (navigator.share) await navigator.share({ title: product.name, url: window.location.href })
              else {
                await navigator.clipboard.writeText(window.location.href)
                onNotify('Link copied to clipboard')
              }
            } catch {
              /* user cancelled share sheet */
            }
          }}
        >
          ↗
        </button>
      </div>

      <div className="buybox-delivery">
        <div className="delivery-row">
          <span>🚚 Standard delivery</span>
          <span>{product.delivery.standard}</span>
        </div>
        <div className="delivery-row">
          <span>⚡ Express delivery</span>
          <span>{product.delivery.express}</span>
        </div>
        <div className="delivery-row">
          <span>↩ Returns</span>
          <span>Free within 30 days</span>
        </div>
      </div>
    </div>
  )
}
