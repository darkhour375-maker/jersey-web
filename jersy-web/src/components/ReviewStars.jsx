import { IconStar } from './icons.jsx'

export default function ReviewStars({ rating, size = 16 }) {
  return (
    <span className="review-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar
          key={i}
          filled={i < Math.round(rating)}
          width={size}
          height={size}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}
