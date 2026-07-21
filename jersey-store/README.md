# KOP Store — Liverpool-Styled Jersey PDP Demo

An unofficial, fan-made ecommerce product page demo built with React 18 + Vite,
following the site structure and component breakdown from the attached
"React Ecommerce Website Reference Analysis" (Adidas PDP layout/UX pattern).

**Not affiliated with, endorsed by, or sponsored by Liverpool FC, the Premier
League, or any kit manufacturer.** Product name, styling, and copy are original
fan-content. All photography is real, freely-licensed stock photography from
Unsplash (unsplash.com) — generic athletic-wear shots with no club crest,
federation badge, or brand logo visible. This keeps everything you see in the
browser free of copyrighted/trademarked imagery while still using genuine
photographs rather than illustrations.

## Structure (per the reference doc)

- Announcement bar
- Header — logo, nav, country selector, dark-mode toggle, cart
- Breadcrumb
- Product section — gallery (thumbnails, zoom, fullscreen lightbox), buy box
  (price/discount, size grid, quantity, Add to Bag / Buy Now, wishlist, share,
  delivery estimate)
- Accordion — Overview, Features, Specifications, Materials, Care, Technology,
  Warranty
- Reviews — average rating, rating breakdown bars, sub-ratings (Comfort,
  Quality, Fit, Length), sort/filter, helpful votes, write-a-review modal
- Related Products — quick add, wishlist, quick view
- Recently Viewed
- Newsletter + full footer (Help, Shop, Company, Social)

Cart state is in a React Context (`CartContext`), persisted to `localStorage`,
with a slide-out drawer supporting quantity edits, coupon codes (try `RED10`),
and a shipping estimator.

## Run it

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
