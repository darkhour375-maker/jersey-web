import { useCart } from '../context/CartContext.jsx'

export default function Header({ theme, onToggleTheme, onOpenCart }) {
  const { count } = useCart()

  return (
    <>
      <div className="announcement-bar">Unofficial fan-made demo — not affiliated with Liverpool FC · Free shipping over $75</div>
      <header className="site-header">
        <div className="site-header-inner">
          <span className="wordmark">KOP&nbsp;Store</span>
          <nav className="primary-nav" aria-label="Primary">
            <a href="#top">New</a>
            <a href="#top">Kits</a>
            <a href="#top">Training</a>
            <a href="#top">Sale</a>
          </nav>
          <div className="header-actions">
            <select className="country-select" aria-label="Country / region" defaultValue="US">
              <option value="US">🇺🇸 US</option>
              <option value="GB">🇬🇧 UK</option>
              <option value="RW">🇷🇼 Rwanda</option>
              <option value="DE">🇩🇪 Germany</option>
            </select>
            <button
              type="button"
              className="btn-icon"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <button
              type="button"
              className="btn-icon cart-trigger"
              onClick={onOpenCart}
              aria-label={`Open bag, ${count} items`}
            >
              🛍
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
