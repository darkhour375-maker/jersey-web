export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']

export const COLORWAYS = [
  {
    id: 'home',
    label: 'Home Red',
    swatch: '#c8102e',
    palette: { primary: '#c8102e', secondary: '#0e0e12', accent: '#f5f5f0' },
    stock: { XS: 6, S: 14, M: 22, L: 18, XL: 0, XXL: 5, '3XL': 3 },
  },
  {
    id: 'away',
    label: 'Away White',
    swatch: '#f5f5f0',
    palette: { primary: '#f5f5f0', secondary: '#c8102e', accent: '#0e0e12' },
    stock: { XS: 3, S: 0, M: 9, L: 12, XL: 7, XXL: 0, '3XL': 4 },
  },
  {
    id: 'third',
    label: 'Third Teal',
    swatch: '#0e4749',
    palette: { primary: '#0e4749', secondary: '#f2c94c', accent: '#f5f5f0' },
    stock: { XS: 5, S: 8, M: 8, L: 0, XL: 6, XXL: 6, '3XL': 0 },
  },
]

export const PRODUCT = {
  id: 'lfc-25-26-home',
  name: 'Liverpool 25/26 Home Jersey',
  subtitle: "Men's Football Top",
  badge: 'New Release',
  price: 90,
  currency: 'USD',
  rating: 4.7,
  ratingCount: 238,
  bullets: [
    'Regular fit for everyday wear',
    'Soft, breathable recycled-mesh fabric',
    'Ribbed collar with contrast trim',
    'Side vents for freedom of movement',
    'Made with a minimum of 75% recycled materials',
  ],
  description:
    'Celebrate matchday in a top built for the stands or the five-a-side pitch. ' +
    'A lightweight, breathable knit keeps you cool while the classic crew collar ' +
    'and contrast side panels bring the club colors to life.',
  delivery: {
    estimate: 'Free standard delivery, arrives in 3-5 business days',
    returns: '30-day free returns on unworn items with tags attached',
  },
  sizeGuide: [
    { size: 'XS', chest: '34-36"', length: '27"' },
    { size: 'S', chest: '36-38"', length: '28"' },
    { size: 'M', chest: '38-40"', length: '29"' },
    { size: 'L', chest: '40-42"', length: '30"' },
    { size: 'XL', chest: '42-45"', length: '31"' },
    { size: 'XXL', chest: '45-48"', length: '32"' },
    { size: '3XL', chest: '48-51"', length: '33"' },
  ],
  reviews: [
    {
      id: 'r1',
      author: 'J. Kowalski',
      rating: 5,
      title: 'True to size and great quality',
      body:
        'Fabric feels premium and the fit is exactly what I expected from the size chart. ' +
        'Ordered a medium and it fits perfectly.',
      date: '2026-05-02',
      verified: true,
    },
    {
      id: 'r2',
      author: 'A. Odum',
      rating: 4,
      title: 'Great top, runs slightly large',
      body: 'Love the colors and the material breathes well. I could have sized down one size.',
      date: '2026-04-18',
      verified: true,
    },
    {
      id: 'r3',
      author: 'M. Delgado',
      rating: 5,
      title: 'Matchday ready',
      body: 'Picked this up ahead of the new season. Stitching feels durable and it washes well.',
      date: '2026-03-27',
      verified: false,
    },
  ],
}
