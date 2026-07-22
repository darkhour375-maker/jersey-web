export function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? 'is-visible' : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}

const SIZE_TABLE = [
  { size: 'XS', chest: '33–34"', length: '26"' },
  { size: 'S', chest: '35–37"', length: '27"' },
  { size: 'M', chest: '38–40"', length: '28"' },
  { size: 'L', chest: '41–43"', length: '29"' },
  { size: 'XL', chest: '44–46"', length: '30"' },
  { size: '2XL', chest: '47–49"', length: '31"' },
  { size: '3XL', chest: '50–52"', length: '32"' },
]

export function SizeGuideModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h3>Size Guide</h3>
        <table className="spec-table size-guide-table">
          <thead>
            <tr><th>Size</th><th>Chest</th><th>Length</th></tr>
          </thead>
          <tbody>
            {SIZE_TABLE.map((row) => (
              <tr key={row.size}>
                <td>{row.size}</td>
                <td>{row.chest}</td>
                <td>{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="modal-note">Measurements are body measurements, not garment measurements. If between sizes, we recommend sizing up.</p>
      </div>
    </div>
  )
}

export function ErrorBoundaryFallback({ error }) {
  return (
    <div className="error-boundary">
      <h2>Something went wrong</h2>
      <p>{error?.message ?? 'Please refresh the page and try again.'}</p>
    </div>
  )
}
