import { useState } from 'react'
import JerseyArt from './JerseyArt.jsx'
import { IconClose } from './icons.jsx'

const VIEWS = [
  { view: 'front', label: 'Front' },
  { view: 'back', label: 'Back' },
  { view: 'model', label: 'Angle' },
  { view: 'detail', label: 'Detail' },
]

export default function Gallery({ palette, name, number }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const active = VIEWS[activeIndex]

  return (
    <div className="gallery">
      <div className="gallery-thumbs">
        {VIEWS.map((v, i) => (
          <button
            key={v.view}
            type="button"
            className={`gallery-thumb ${i === activeIndex ? 'is-active' : ''}`}
            aria-label={`Show ${v.label} view`}
            aria-pressed={i === activeIndex}
            onClick={() => setActiveIndex(i)}
          >
            <JerseyArt view={v.view} {...palette} name={name} number={number} />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="gallery-main"
        onClick={() => setLightbox(true)}
        aria-label="Open full-size image"
      >
        <div key={active.view} className="gallery-main-image">
          <JerseyArt view={active.view} {...palette} name={name} number={number} />
        </div>
        <span className="gallery-zoom-hint">Click to zoom</span>
      </button>

      <div className="gallery-dots">
        {VIEWS.map((v, i) => (
          <button
            key={v.view}
            type="button"
            aria-label={`Show ${v.label} view`}
            className={`gallery-dot ${i === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Zoomed product image">
          <button
            type="button"
            className="lightbox-backdrop"
            aria-label="Close zoomed image"
            onClick={() => setLightbox(false)}
          />
          <div className="lightbox-content">
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightbox(false)}
              aria-label="Close"
            >
              <IconClose />
            </button>
            <JerseyArt view={active.view} {...palette} name={name} number={number} />
          </div>
        </div>
      )}
    </div>
  )
}
