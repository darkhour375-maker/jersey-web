// All photography below is sourced from Unsplash (unsplash.com) — free for
// commercial use, no attribution required. These are real photographs, but
// deliberately generic ones: none show an official club crest, federation
// badge, or kit-sponsor logo. This is an unofficial, fan-made demo — not
// affiliated with or endorsed by Liverpool FC or any kit manufacturer.

export const PRODUCT = {
  id: 'RED-2526-HM',
  code: 'LV8126',
  name: 'Home Jersey 25/26',
  subtitle: 'Liverpool Red · Replica Fan Kit',
  team: 'Liverpool',
  category: 'Soccer / Club / Home Jersey',
  price: 50,
  compareAtPrice: 100,
  discountText: '-50%',
  rating: 4.9,
  reviewCount: 149,
  stock: 'In Stock',
  colorway: 'Anfield Red',
  description:
    "The Home Jersey 25/26 carries the shirt this city has sung about for over a century — that unmistakable red, cut close to the body and built to move. A doubleknit weave keeps its shape from first whistle to full time, while a laser-cut ventilation panel across the back releases heat when the game opens up.",
  features: [
    'Slim, athletic fit',
    'Doubleknit performance fabric',
    'Moisture-management finish',
    'Quick-drying construction',
    'Embroidered chest crest placement',
  ],
  images: [
    'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=1200&q=80&fm=jpg&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1662096909714-e2f206d0a636?w=1200&q=80&fm=jpg&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1693683224122-0a8e206f248d?w=1200&q=80&fm=jpg&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1738091063217-1f59463342c9?w=1200&q=80&fm=jpg&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1641570882851-72738e6e98ee?w=1200&q=80&fm=jpg&fit=crop&auto=format',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
  outOfStockSizes: ['XS', '4XL'],
  usp: [
    'Slim, athletic fit',
    'Ventilated doubleknit weave',
    'Main material: 100% recycled polyester',

    'Moisture-wicking finish',
    'Reinforced crew collar',
  ],
  care: [
    'Machine wash cold, like colors',
    'Do not bleach',
    'Tumble dry low',
    'Cool iron if needed, inside out',
    'Do not dry clean',
  ],
  materials: [
    { label: 'Shell', value: '100% recycled polyester doubleknit' },
    { label: 'Collar', value: 'Reinforced ribbed crew' },
    { label: 'Weight', value: '178 gsm' },
    { label: 'Origin', value: 'Made in Vietnam' },
  ],
  technology: [
    {
      name: 'AeroFlow Venting',
      description: 'Laser-cut panels across the back release heat as your pace picks up.',
    },
    {
      name: 'DryCore Finish',
      description: 'A moisture-wicking topical finish keeps the fabric surface dry to the touch.',
    },
  ],
  warranty:
    '90-day manufacturing defect warranty from date of purchase. Normal wear, fading from washing, and match-day wear and tear are not covered.',
  delivery: {
    standard: '5–7 business days · Free over $75',
    express: '2–3 business days · $12.99',
  },
  ratingBreakdown: [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 14 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
  ],
  subRatings: [
    { label: 'Comfort', score: 4.8 },
    { label: 'Quality', score: 4.9 },
    { label: 'Fit', score: 4.6 },
    { label: 'Length', score: 4.7 },
  ],
}

export const REVIEWS = [
  {
    id: 'r1',
    author: 'Marcus T.',
    rating: 5,
    date: '2026-06-02',
    verified: true,
    size: 'M',
    helpful: 24,
    title: 'True to size and genuinely breathable',
    body: "Wore this in a 90-minute five-a-side session and it stayed light the whole way through. Collar hasn't lost shape after four washes either.",
  },
  {
    id: 'r2',
    author: 'Priya K.',
    rating: 5,
    date: '2026-05-21',
    verified: true,
    size: 'S',
    helpful: 17,
    title: 'Fabric feels premium',
    body: 'Thicker and more structured than I expected for the price. Color held up after washing on cold.',
  },
  {
    id: 'r3',
    author: 'Diego R.',
    rating: 4,
    date: '2026-05-09',
    verified: true,
    size: 'L',
    helpful: 9,
    title: 'Great fit, sizing runs slightly slim',
    body: "Went up a size from my usual and it's perfect. If you like a looser cut, size up.",
  },
  {
    id: 'r4',
    author: 'Ella M.',
    rating: 3,
    date: '2026-04-30',
    verified: false,
    size: 'M',
    helpful: 3,
    title: 'Good but not amazing',
    body: 'Comfortable enough, but I expected the ventilation panel to be more noticeable during actual play.',
  },
]

export const RELATED_PRODUCTS = [
  {
    id: 'RED-2526-AW',
    name: 'Away Jersey 25/26',
    price: 55,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1763656813028-3eb492fa7bcf?w=800&q=80&fm=jpg&fit=crop&auto=format',
  },
  {
    id: 'RED-2526-TR',
    name: 'Training Tee',
    price: 38,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551854269-93c58e58b410?w=800&q=80&fm=jpg&fit=crop&auto=format',
  },
  {
    id: 'RED-2526-GK',
    name: 'Goalkeeper Jersey',
    price: 62,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1641570882851-72738e6e98ee?w=800&q=80&fm=jpg&fit=crop&auto=format',
  },
  {
    id: 'RED-2526-KD',
    name: 'Home Jersey 25/26 — Kids',
    price: 42,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551854415-1df5f0d94b99?w=800&q=80&fm=jpg&fit=crop&auto=format',
  },
]

export const RECENTLY_VIEWED = [
  {
    id: 'RED-2425-HM',
    name: 'Home Jersey 24/25',
    price: 45,
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=800&q=80&fm=jpg&fit=crop&auto=format',
  },
  {
    id: 'RED-2526-TR',
    name: 'Training Tee',
    price: 38,
    image: 'https://images.unsplash.com/photo-1551854269-93c58e58b410?w=800&q=80&fm=jpg&fit=crop&auto=format',
  },
  {
    id: 'RED-2526-SC',
    name: 'Fan Scarf',
    price: 20,
    image: 'https://images.unsplash.com/photo-1738091063217-1f59463342c9?w=800&q=80&fm=jpg&fit=crop&auto=format',
  },
]
