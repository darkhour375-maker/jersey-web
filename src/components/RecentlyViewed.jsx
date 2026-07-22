const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export default function RecentlyViewed({ products }) {
  if (!products.length) return null
  return (
    <section className="recently-viewed">
      <h2>Recently Viewed</h2>
      <div className="recently-viewed-rail">
        {products.map((p) => (
          <div className="rv-card" key={p.id}>
            <img src={p.image} alt={p.name} loading="lazy" />
            <p className="rv-name">{p.name}</p>
            <p className="rv-price">{fmt(p.price)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
