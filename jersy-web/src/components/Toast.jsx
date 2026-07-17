import { IconCheck } from './icons.jsx'

export default function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? 'is-visible' : ''}`} role="status" aria-live="polite">
      <span className="toast-icon">
        <IconCheck />
      </span>
      {message}
    </div>
  )
}
