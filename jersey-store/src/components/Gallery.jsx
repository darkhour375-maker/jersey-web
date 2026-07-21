import { useState } from 'react'

export default function Gallery({ images, productName }) {
  const [active, setActive] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)

  return (
    <div className="gallery">
      <div className="gallery-thumbs">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={`gallery-thumb ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      <button type="button" className="gallery-main" onClick={() => setZoomOpen(true)} aria-label="Open fullscreen">
        <img src={images[active]} alt={productName} />
        <span className="gallery-zoom-hint">Click to zoom</span>
      </button>

      {zoomOpen && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" onClick={() => setZoomOpen(false)}>
          <button type="button" className="gallery-lightbox-close" aria-label="Close">
            ✕
          </button>
          <img src={images[active]} alt={productName} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
