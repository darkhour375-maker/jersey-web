import { useMemo, useState } from 'react'

export default function ReviewsSection({ product, reviews }) {
  const [sort, setSort] = useState('newest')
  const [starFilter, setStarFilter] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [helpfulVotes, setHelpfulVotes] = useState({})

  function markHelpful(id) {
    setHelpfulVotes((prev) => ({ ...prev, [id]: true }))
  }

  const visible = useMemo(() => {
    let list = starFilter ? reviews.filter((r) => r.rating === starFilter) : reviews
    list = [...list].sort((a, b) => {
      if (sort === 'newest') return new Date(b.date) - new Date(a.date)
      if (sort === 'highest') return b.rating - a.rating
      if (sort === 'lowest') return a.rating - b.rating
      return 0
    })
    return list
  }, [reviews, sort, starFilter])

  return (
    <section id="reviews" className="reviews-section">
      <h2>Ratings &amp; Reviews</h2>

      <div className="reviews-summary">
        <div className="reviews-summary-score">
          <span className="reviews-score-num">{product.rating}</span>
          <span aria-hidden="true">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
          <span className="reviews-score-count">{product.reviewCount} ratings</span>
        </div>
        <div className="reviews-bars">
          {product.ratingBreakdown.map((row) => (
            <button
              type="button"
              key={row.stars}
              className={`reviews-bar-row ${starFilter === row.stars ? 'is-active' : ''}`}
              onClick={() => setStarFilter((s) => (s === row.stars ? 0 : row.stars))}
            >
              <span>{row.stars}★</span>
              <span className="reviews-bar-track">
                <span className="reviews-bar-fill" style={{ width: `${row.pct}%` }} />
              </span>
              <span>{row.pct}%</span>
            </button>
          ))}
        </div>
      </div>

      <div className="reviews-subratings">
        {product.subRatings.map((sr) => (
          <div className="subrating-row" key={sr.label}>
            <span>{sr.label}</span>
            <span className="reviews-bar-track"><span className="reviews-bar-fill" style={{ width: `${(sr.score / 5) * 100}%` }} /></span>
            <span>{sr.score}</span>
          </div>
        ))}
      </div>

      <div className="reviews-controls">
        <div className="reviews-sort">
          <label htmlFor="review-sort">Sort by</label>
          <select id="review-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </div>
        <button type="button" className="btn btn-outline" onClick={() => setShowForm(true)}>
          Write a review
        </button>
      </div>

      <ul className="reviews-list">
        {visible.map((r) => (
          <li key={r.id} className="review-card">
            <div className="review-card-head">
              <span aria-hidden="true">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              {r.verified && <span className="verified-badge">Verified Purchase</span>}
            </div>
            <h4>{r.title}</h4>
            <p>{r.body}</p>
            <p className="review-meta">{r.author} · Size {r.size} · {new Date(r.date).toLocaleDateString()}</p>
            <button type="button" className="link-btn helpful-btn" onClick={() => markHelpful(r.id)} disabled={helpfulVotes[r.id]}>
              👍 Helpful ({r.helpful + (helpfulVotes[r.id] ? 1 : 0)})
            </button>
          </li>
        ))}
        {visible.length === 0 && <p>No reviews match this filter yet.</p>}
      </ul>

      {showForm && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setShowForm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setShowForm(false)} aria-label="Close">✕</button>
            {submitted ? (
              <>
                <h3>Thanks for your review!</h3>
                <p>It'll appear here once it's been checked.</p>
                <button type="button" className="btn btn-primary" onClick={() => { setShowForm(false); setSubmitted(false) }}>
                  Done
                </button>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <h3>Write a review</h3>
                <label>
                  Rating
                  <select required defaultValue="">
                    <option value="" disabled>Select a rating</option>
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Review title
                  <input required type="text" placeholder="Sum it up in a few words" />
                </label>
                <label>
                  Your review
                  <textarea required rows={4} placeholder="Tell us about the fit, feel, and quality" />
                </label>
                <button type="submit" className="btn btn-primary btn-block">Submit review</button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
