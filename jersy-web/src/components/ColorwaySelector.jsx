export default function ColorwaySelector({ colorways, value, onChange }) {
  const active = colorways.find((c) => c.id === value)

  return (
    <div className="field">
      <label className="field-label" id="colorway-label">
        Color — <span className="field-label-value">{active?.label}</span>
      </label>
      <div className="swatch-row" role="listbox" aria-labelledby="colorway-label">
        {colorways.map((c) => (
          <button
            key={c.id}
            type="button"
            role="option"
            aria-selected={c.id === value}
            title={c.label}
            className={`swatch ${c.id === value ? 'is-selected' : ''}`}
            style={{ '--swatch-color': c.swatch }}
            onClick={() => onChange(c.id)}
          >
            <span className="swatch-dot" />
          </button>
        ))}
      </div>
    </div>
  )
}
