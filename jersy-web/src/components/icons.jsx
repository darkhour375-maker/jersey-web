// Lightweight inline icon set. Kept as simple stroke-based SVGs so they
// inherit color via currentColor and need no external asset requests.

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconChevronDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function IconClose(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function IconHeart({ filled, ...props }) {
  return (
    <svg
      {...base}
      fill={filled ? 'currentColor' : 'none'}
      {...props}
    >
      <path d="M12 20.5s-7.5-4.6-10-9.3C.4 7.8 2.2 4 6 4c2.1 0 3.6 1.1 4.5 2.4C11.4 5.1 12.9 4 15 4c3.8 0 5.6 3.8 4 7.2-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  )
}

export function IconBag(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8h12l-1 12.5a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

export function IconSearch(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

export function IconTruck(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7.5" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  )
}

export function IconReturn(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10h11a5 5 0 0 1 0 10H9" />
      <path d="M7 6 3 10l4 4" />
    </svg>
  )
}

export function IconShield(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function IconStar({ filled, ...props }) {
  return (
    <svg
      {...base}
      fill={filled ? 'currentColor' : 'none'}
      {...props}
    >
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8 2.6-5.4Z" />
    </svg>
  )
}

export function IconMinus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function IconPlus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function IconSpinner(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        strokeOpacity="0.25"
      />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  )
}
