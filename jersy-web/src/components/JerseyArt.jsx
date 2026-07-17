import { useId } from 'react'

// Shared body silhouette, reused by every view so front/back/detail stay in sync.
const BODY_PATH =
  'M122,58 C122,36 158,16 200,16 C242,16 278,36 278,58 L278,82 L344,114 L322,176 L278,154 L278,424 Q278,446 256,446 L144,446 Q122,446 122,424 L122,154 L78,176 L56,114 L122,82 Z'

const LEFT_SLEEVE_PATH = 'M122,58 L56,114 L78,176 L122,154 Z'
const RIGHT_SLEEVE_PATH = 'M278,58 L344,114 L322,176 L278,154 Z'
const NECK_PATH = 'M176,20 Q200,58 224,20 Q212,13 200,13 Q188,13 176,20 Z'

/**
 * Illustrated jersey graphic. Intentionally generic/original artwork (no club
 * crest or manufacturer marks are reproduced) so colorways can be swapped
 * freely via props.
 */
export default function JerseyArt({
  view = 'front',
  primary = '#c8102e',
  secondary = '#0e0e12',
  accent = '#f5f5f0',
  number = '11',
  name = 'PLAYER',
  className = '',
}) {
  const uid = useId()
  const clipId = `jersey-clip-${uid}`
  const sheenId = `jersey-sheen-${uid}`
  const shadowId = `jersey-shadow-${uid}`

  const isDetail = view === 'detail'
  const isBack = view === 'back'
  const isModel = view === 'model'

  const viewBox = isDetail ? '150 30 130 140' : '0 0 400 480'

  return (
    <svg
      className={`jersey-art ${className}`}
      viewBox={viewBox}
      role="img"
      aria-label={`Jersey ${view} view`}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={BODY_PATH} />
        </clipPath>
        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id={shadowId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.16" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {!isDetail && <ellipse cx="200" cy="452" rx="120" ry="16" fill={`url(#${shadowId})`} />}

      <g className={isModel ? 'jersey-tilt' : undefined}>
        {/* sleeves (secondary color) */}
        <path d={LEFT_SLEEVE_PATH} fill={secondary} />
        <path d={RIGHT_SLEEVE_PATH} fill={secondary} />

        {/* sleeve cuffs */}
        <path d="M56,114 L78,176 L92,171 L72,112 Z" fill={accent} />
        <path d="M344,114 L322,176 L308,171 L328,112 Z" fill={accent} />

        {/* body */}
        <path d={BODY_PATH} fill={primary} />

        {/* side panel stripes, clipped to body silhouette */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="118" y="60" width="10" height="390" fill={accent} opacity="0.85" />
          <rect x="272" y="60" width="10" height="390" fill={accent} opacity="0.85" />
          <rect x="122" y="420" width="156" height="26" fill={secondary} />
          <rect x="0" y="0" width="400" height="480" fill={`url(#${sheenId})`} />
        </g>

        {/* collar */}
        <path d={NECK_PATH} fill={isBack ? primary : accent} stroke={secondary} strokeWidth="2" />

        {!isBack && (
          <>
            {/* crest placeholder (generic shield, no club marks) */}
            <g transform="translate(150,95)">
              <path
                d="M14,0 L28,6 V20 C28,30 21,36 14,40 C7,36 0,30 0,20 V6 Z"
                fill={accent}
                stroke={secondary}
                strokeWidth="1.5"
              />
              <path d="M14,8 L14,32 M6,16 L22,16" stroke={primary} strokeWidth="2" />
            </g>
            {/* small chest logo mark, generic geometric shape */}
            <g transform="translate(232,98)">
              <path d="M0,14 L7,0 L14,14 L7,28 Z" fill={accent} opacity="0.9" />
            </g>
          </>
        )}

        {isBack && (
          <>
            <text
              x="200"
              y="140"
              textAnchor="middle"
              fontFamily="var(--sans)"
              fontWeight="700"
              fontSize="22"
              letterSpacing="4"
              fill={accent}
            >
              {name}
            </text>
            <text
              x="200"
              y="250"
              textAnchor="middle"
              fontFamily="var(--sans)"
              fontWeight="700"
              fontSize="96"
              fill={accent}
            >
              {number}
            </text>
          </>
        )}
      </g>
    </svg>
  )
}
