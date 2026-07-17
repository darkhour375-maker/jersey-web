import { useEffect } from 'react'
import { IconClose } from './icons.jsx'

export default function SizeGuideModal({ open, onClose, rows }) {
  useEffect(() => {
    if (!open) return
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-layer">
      <button
        type="button"
        className="modal-backdrop"
        aria-label="Close size guide"
        onClick={onClose}
      />
      <div className="modal" role="dialog" aria-modal="true" aria-label="Size guide">
        <header className="modal-header">
          <h2>Size Guide</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </header>
        <div className="modal-body">
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest</th>
                <th>Body Length</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.size}>
                  <td>{r.size}</td>
                  <td>{r.chest}</td>
                  <td>{r.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="modal-note">
            Measurements are approximate. For a looser fit, we recommend sizing up.
          </p>
        </div>
      </div>
    </div>
  )
}
