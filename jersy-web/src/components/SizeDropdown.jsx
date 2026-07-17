import { useEffect, useRef, useState } from 'react'
import { IconChevronDown } from './icons.jsx'

export default function SizeDropdown({
  sizes,
  stock,
  value,
  onChange,
  onOpenSizeGuide,
  invalid,
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <div className="field" ref={rootRef}>
      <div className="field-label-row">
        <label className="field-label" id="size-label">
          Size {value ? <span className="field-label-value">— {value}</span> : null}
        </label>
        <button type="button" className="link-btn" onClick={onOpenSizeGuide}>
          Size guide
        </button>
      </div>

      <div className={`dropdown ${invalid ? 'is-invalid' : ''}`}>
        <button
          type="button"
          className="dropdown-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby="size-label"
          onClick={() => setOpen((v) => !v)}
        >
          {value || 'Select size'}
          <IconChevronDown
            className={`dropdown-chevron ${open ? 'is-open' : ''}`}
            aria-hidden="true"
          />
        </button>

        {open && (
          <div className="dropdown-panel" role="listbox" aria-label="Available sizes">
            <div className="size-grid">
              {sizes.map((size) => {
                const available = (stock[size] ?? 0) > 0
                const selected = value === size
                return (
                  <button
                    key={size}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    disabled={!available}
                    className={`size-chip ${selected ? 'is-selected' : ''} ${
                      available ? '' : 'is-disabled'
                    }`}
                    onClick={() => {
                      onChange(size)
                      setOpen(false)
                    }}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
            <p className="dropdown-hint">Greyed-out sizes are currently out of stock.</p>
          </div>
        )}
      </div>
      {invalid && <p className="field-error">Please select a size before adding to bag.</p>}
    </div>
  )
}
