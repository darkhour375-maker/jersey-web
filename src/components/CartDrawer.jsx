import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export default function CartDrawer({ open, onClose, onNotify }) {
  const cart = useCart()
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [zip, setZip] = useState('')
  const [shipping, setShipping] = useState(null)

  const discount = appliedCoupon ? cart.subtotal * 0.1 : 0
  const total = cart.subtotal - discount + (shipping ?? 0)

  function applyCoupon(e) {
    e.preventDefault()
    if (coupon.trim().toUpperCase() === 'RED10') {
      setAppliedCoupon(coupon.trim().toUpperCase())
      onNotify('Coupon applied — 10% off')
    } else {
      onNotify('That coupon code is not valid')
    }
  }

  function calcShipping(e) {
    e.preventDefault()
    if (zip.trim().length < 3) return
    setShipping(cart.subtotal >= 75 ? 0 : 6.99)
  }

  return (
    <>
      <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="cart-drawer-head">
          <h3>Your Bag ({cart.count})</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close bag">✕</button>
        </div>

        {cart.items.length === 0 ? (
          <p className="cart-empty">Your bag is empty.</p>
        ) : (
          <ul className="cart-items">
            {cart.items.map((item) => (
              <li className="cart-item" key={item.key}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-body">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-size">Size {item.size}</p>
                  <div className="qty-stepper qty-stepper-sm">
                    <button type="button" onClick={() => cart.updateQuantity(item.key, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => cart.updateQuantity(item.key, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-side">
                  <span>{fmt(item.price * item.quantity)}</span>
                  <button type="button" className="link-btn" onClick={() => cart.removeItem(item.key)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.items.length > 0 && (
          <div className="cart-drawer-foot">
            <form className="cart-coupon" onSubmit={applyCoupon}>
              <input
                type="text"
                placeholder="Coupon code (try RED10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button type="submit" className="btn btn-outline">Apply</button>
            </form>

            <form className="cart-coupon" onSubmit={calcShipping}>
              <input type="text" placeholder="ZIP code" value={zip} onChange={(e) => setZip(e.target.value)} />
              <button type="submit" className="btn btn-outline">Estimate shipping</button>
            </form>

            <div className="cart-totals">
              <div className="cart-totals-row"><span>Subtotal</span><span>{fmt(cart.subtotal)}</span></div>
              {appliedCoupon && <div className="cart-totals-row"><span>Coupon ({appliedCoupon})</span><span>−{fmt(discount)}</span></div>}
              {shipping !== null && <div className="cart-totals-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : fmt(shipping)}</span></div>}
              <div className="cart-totals-row cart-totals-total"><span>Total</span><span>{fmt(total)}</span></div>
            </div>

            <button type="button" className="btn btn-primary btn-block" onClick={() => onNotify('Checkout is a demo in this build')}>
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
