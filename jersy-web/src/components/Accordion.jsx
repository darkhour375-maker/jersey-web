import { useEffect, useId, useRef, useState } from 'react'
import { IconChevronDown } from './icons.jsx'

export default function Accordion({ title, icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  const [height, setHeight] = useState(0)
  const innerRef = useRef(null)
  const id = useId()

  // Measure the panel's natural height whenever it opens/closes so the
  // max-height transition animates to the right value instead of a guess.
  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    setHeight(open ? inner.scrollHeight : 0)
  }, [open])

  // Keep the open height in sync if the content itself resizes (e.g. text
  // reflow on window resize) while the panel is expanded.
  useEffect(() => {
    const inner = innerRef.current
    if (!inner || !open) return
    const observer = new ResizeObserver(() => setHeight(inner.scrollHeight))
    observer.observe(inner)
    return () => observer.disconnect()
  }, [open])

  return (
    <div className={`accordion ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="accordion-trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="accordion-trigger-label">
          {icon}
          {title}
        </span>
        <IconChevronDown className="accordion-chevron" aria-hidden="true" />
      </button>
      <div id={id} className="accordion-panel" style={{ maxHeight: height }}>
        <div ref={innerRef} className="accordion-panel-inner">
          {children}
        </div>
      </div>
    </div>
  )
}
