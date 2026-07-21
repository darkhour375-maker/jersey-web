import { useState } from 'react'

function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="accordion-item">
      <button type="button" className="accordion-trigger" onClick={onToggle} aria-expanded={isOpen}>
        {title}
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="accordion-panel">{children}</div>}
    </div>
  )
}

export default function DetailsAccordion({ product }) {
  const [openKey, setOpenKey] = useState('overview')
  const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key))

  return (
    <section className="details-accordion" aria-label="Product details">
      <AccordionItem title="Overview" isOpen={openKey === 'overview'} onToggle={() => toggle('overview')}>
        <p>{product.description}</p>
      </AccordionItem>

      <AccordionItem title="Features" isOpen={openKey === 'features'} onToggle={() => toggle('features')}>
        <ul>
          {product.usp.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem title="Specifications" isOpen={openKey === 'specs'} onToggle={() => toggle('specs')}>
        <table className="spec-table">
          <tbody>
            {product.materials.map((m) => (
              <tr key={m.label}>
                <th>{m.label}</th>
                <td>{m.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AccordionItem>

      <AccordionItem title="Materials" isOpen={openKey === 'materials'} onToggle={() => toggle('materials')}>
        <p>Main shell is 100% recycled polyester, engineered as a doubleknit for structure without added weight.</p>
      </AccordionItem>

      <AccordionItem title="Care Instructions" isOpen={openKey === 'care'} onToggle={() => toggle('care')}>
        <ul>
          {product.care.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem title="Technology" isOpen={openKey === 'tech'} onToggle={() => toggle('tech')}>
        {product.technology.map((t) => (
          <div className="tech-block" key={t.name}>
            <h4>{t.name}</h4>
            <p>{t.description}</p>
          </div>
        ))}
      </AccordionItem>

      <AccordionItem title="Warranty" isOpen={openKey === 'warranty'} onToggle={() => toggle('warranty')}>
        <p>{product.warranty}</p>
      </AccordionItem>
    </section>
  )
}
