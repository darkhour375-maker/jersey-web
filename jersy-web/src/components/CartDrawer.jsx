import JerseyArt from './JerseyArt.jsx'
import { IconClose, IconMinus, IconPlus, IconBag } from './icons.jsx'

export default function CartDrawer({ open, onClose, cart }) {
  return (
    <div className={`drawer-layer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close cart"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <header className="drawer-header">
          <h2>Your Bag ({cart.items.reduce((n, i) => n + i.quantity, 0)})</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </header>

        {cart.items.length === 0 ? (
          <div className="drawer-empty">
            <IconBag />
            <p>Your bag is empty.</p>
            <button type="button" className="link-btn" onClick={onClose}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer-items">
              {cart.items.map((item) => (
                <li key={`${item.productId}-${item.variantLabel}`} className="drawer-item">
                  <div className="drawer-item-image">
                    <JerseyArt {...item.imageSrc} />
                  </div>
                  <div className="drawer-item-body">
                    <p className="drawer-item-title">{item.title}</p>
                    <p className="drawer-item-variant">Size {item.variantLabel}</p>
                    <div className="drawer-item-row">
                      <div className="stepper stepper-sm">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            cart.setQuantity(item.productId, item.variantLabel, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <IconMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            cart.setQuantity(item.productId, item.variantLabel, item.quantity + 1)
                          }
                        >
                          <IconPlus />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="link-btn link-btn-muted"
                        onClick={() => cart.removeItem(item.productId, item.variantLabel)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="drawer-item-price">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                      item.price * item.quantity,
                    )}
                  </p>
                </li>
              ))}
            </ul>
            <footer className="drawer-footer">
              <div className="drawer-subtotal">
                <span>Subtotal</span>
                <span>{cart.subtotalLabel}</span>
              </div>
              <p className="drawer-footer-note">Taxes and shipping calculated at checkout.</p>
              <button type="button" className="btn btn-primary btn-block">
                Checkout
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
