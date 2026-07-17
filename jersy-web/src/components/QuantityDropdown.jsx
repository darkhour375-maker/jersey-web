import { useEffect, useRef, useState } from 'react'
import { IconChevronDown } from './icons.jsx'

export default function QuantityDropdown({ value, max, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const options = Array.from({ length: Math.min(max, 10) }, (_, i) => i + 1)

  useEffect(() => {
    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="field" ref={rootRef}>
      <label className="field-label" id="qty-label">
        Quantity
      </label>
      <div className="dropdown dropdown-narrow">
        <button
          type="button"
          className="dropdown-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby="qty-label"
          onClick={() => setOpen((v) => !v)}
          disabled={max === 0}
        >
          {value}
          <IconChevronDown className={`dropdown-chevron ${open ? 'is-open' : ''}`} aria-hidden="true" />
        </button>
        {open && (
          <div className="dropdown-panel dropdown-panel-narrow" role="listbox" aria-label="Quantity">
            {options.map((n) => (
              <button
                key={n}
                type="button"
                role="option"
                aria-selected={n === value}
                className={`dropdown-option ${n === value ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(n)
                  setOpen(false)
                }}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
