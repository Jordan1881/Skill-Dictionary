// Skill Dictionary — brand logo components
// Ported from the design canvas reference files.
// Palette, BookMark, CircularBadge, ShieldBadge, Wordmark.

export const SD = {
  leather: '#3a1b01',
  page:    '#f6f1e9',
  gold:    '#b8913c',
  hi:      '#d4ac56',
  ink:     '#1e1008',
  red:     '#7a1f1f',
}

// Aged-paper noise + leather grain filters
export function PaperGrain({ id = 'sd-grain', seed = 4 }) {
  return (
    <defs>
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed}/>
        <feColorMatrix values="0 0 0 0 0.12  0 0 0 0 0.06  0 0 0 0 0.03  0 0 0 0.18 0"/>
        <feComposite in2="SourceGraphic" operator="in"/>
      </filter>
      <filter id={id + '-leather'} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed={seed + 1}/>
        <feColorMatrix values="0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 0 0.01  0 0 0 0.35 0"/>
        <feComposite in2="SourceGraphic" operator="in"/>
      </filter>
      <filter id={id + '-worn'}>
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed={seed + 2}/>
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.1"/>
        <feComposite in2="SourceGraphic" operator="in"/>
      </filter>
    </defs>
  )
}

// Open book with neural-tree rising from spine
export function BookMark({ size = 200, includeNeural = true, strokeScale = 1, idPrefix = 'bm' }) {
  const branches = [
    [100, 92, 100, 60],
    [100, 76, 78,  58],
    [100, 76, 122, 58],
    [78,  58, 62,  38],
    [78,  58, 86,  34],
    [122, 58, 138, 38],
    [122, 58, 114, 34],
    [100, 60, 92,  46],
    [100, 60, 108, 46],
  ]
  const nodes = [
    [100, 60, 3.2],
    [78,  58, 2.6],
    [122, 58, 2.6],
    [62,  38, 3.4],
    [86,  34, 3.4],
    [114, 34, 3.4],
    [138, 38, 3.4],
    [92,  46, 1.8],
    [108, 46, 1.8],
  ]

  return (
    <svg viewBox="0 0 200 200" width={size} height={size}
      xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <PaperGrain id={idPrefix + '-grain'} seed={3}/>

      {includeNeural && (
        <g stroke={SD.gold} strokeWidth={1.4 * strokeScale} strokeLinecap="round" fill="none" opacity="0.95">
          {branches.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>
          ))}
        </g>
      )}
      {includeNeural && (
        <g fill={SD.hi}>
          {nodes.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r}/>
          ))}
          <circle cx="100" cy="92" r="3.6" fill={SD.gold}/>
        </g>
      )}

      {/* Left page */}
      <path d="M 100 100 L 100 158 L 44 150 L 44 96 Z"
        fill={SD.page} stroke={SD.ink} strokeWidth={1.2 * strokeScale} strokeLinejoin="round"/>
      {/* Right page */}
      <path d="M 100 100 L 100 158 L 156 150 L 156 96 Z"
        fill={SD.page} stroke={SD.ink} strokeWidth={1.2 * strokeScale} strokeLinejoin="round"/>

      {/* Page rules */}
      <g stroke={SD.ink} strokeWidth={0.7 * strokeScale} strokeLinecap="round" opacity="0.55">
        <line x1="52" y1="108" x2="92" y2="112"/>
        <line x1="52" y1="116" x2="92" y2="120"/>
        <line x1="52" y1="124" x2="92" y2="128"/>
        <line x1="52" y1="132" x2="92" y2="136"/>
        <line x1="52" y1="140" x2="92" y2="143"/>
        <line x1="108" y1="112" x2="148" y2="108"/>
        <line x1="108" y1="120" x2="148" y2="116"/>
        <line x1="108" y1="128" x2="148" y2="124"/>
        <line x1="108" y1="136" x2="148" y2="132"/>
        <line x1="108" y1="143" x2="148" y2="140"/>
      </g>

      {/* Spine shadow */}
      <line x1="100" y1="100" x2="100" y2="158"
        stroke={SD.ink} strokeWidth={1.4 * strokeScale} strokeLinecap="round"/>
      {/* Red ribbon */}
      <path d="M 100 100 L 100 168 L 96 162 L 100 156"
        fill={SD.red} stroke={SD.ink} strokeWidth={0.5 * strokeScale}/>
      {/* Page-edge under-shadow */}
      <path d="M 44 150 L 100 158 L 156 150 L 156 152 L 100 160 L 44 152 Z"
        fill={SD.ink} opacity="0.18"/>
    </svg>
  )
}

// Circular heraldic badge
export function CircularBadge({ size = 320, idPrefix = 'cb' }) {
  return (
    <svg viewBox="0 0 320 320" width={size} height={size}
      xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <filter id={idPrefix + '-leather'} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="5"/>
          <feColorMatrix values="0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 0 0.01  0 0 0 0.28 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
        <filter id={idPrefix + '-worn'}>
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="8"/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.2"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
        <path id={idPrefix + '-top-arc'} d="M 50 160 A 110 110 0 0 1 270 160"/>
        <path id={idPrefix + '-bot-arc'} d="M 60 195 A 100 100 0 0 0 260 195"/>
      </defs>

      {/* Leather ground */}
      <circle cx="160" cy="160" r="152" fill={SD.leather}/>
      <circle cx="160" cy="160" r="152" fill={SD.leather} filter={`url(#${idPrefix}-leather)`}/>

      {/* Outer gold rule — double line */}
      <circle cx="160" cy="160" r="150" fill="none" stroke={SD.gold} strokeWidth="2.2"/>
      <circle cx="160" cy="160" r="142" fill="none" stroke={SD.gold} strokeWidth="0.9"/>
      <circle cx="160" cy="160" r="150" fill="none" stroke={SD.hi}
        strokeWidth="0.6" opacity="0.6" filter={`url(#${idPrefix}-worn)`}/>

      {/* Inner field */}
      <circle cx="160" cy="160" r="118" fill={SD.leather}/>
      <circle cx="160" cy="160" r="118" fill="#4a2408" opacity="0.45"/>
      <circle cx="160" cy="160" r="118" fill="none" stroke={SD.gold} strokeWidth="0.8" opacity="0.85"/>
      <circle cx="160" cy="160" r="114" fill="none" stroke={SD.gold} strokeWidth="0.4" opacity="0.55"/>

      {/* Arc text */}
      <g fill={SD.gold} style={{ fontFamily: 'Cormorant Garamond, Playfair Display, serif', fontWeight: 600, letterSpacing: '0.32em', fontSize: 11 }}>
        <text><textPath href={`#${idPrefix}-top-arc`} startOffset="50%" textAnchor="middle">· EX LIBRIS · ARTIFICII ·</textPath></text>
      </g>
      <g fill={SD.gold} style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, letterSpacing: '0.3em', fontSize: 10, fontStyle: 'italic' }}>
        <text><textPath href={`#${idPrefix}-bot-arc`} startOffset="50%" textAnchor="middle">ANNO  MMXXVI</textPath></text>
      </g>

      {/* Separator dots */}
      <g fill={SD.gold}>
        <circle cx="40" cy="160" r="2"/>
        <circle cx="280" cy="160" r="2"/>
      </g>

      {/* Book + neural tree centered */}
      <g transform="translate(60 60) scale(1.0)">
        <BookMark size={200} idPrefix={idPrefix + '-bm'}/>
      </g>
    </svg>
  )
}

// Shield badge variant
export function ShieldBadge({ size = 320, idPrefix = 'sb' }) {
  const shield = "M 30 30 L 290 30 L 290 170 C 290 240 240 290 160 320 C 80 290 30 240 30 170 Z"
  const shieldInner = "M 50 50 L 270 50 L 270 168 C 270 228 228 270 160 296 C 92 270 50 228 50 168 Z"

  return (
    <svg viewBox="0 0 320 340" width={size} height={(size * 340) / 320}
      xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <filter id={idPrefix + '-leather'}>
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="6"/>
          <feColorMatrix values="0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 0 0.01  0 0 0 0.28 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
        <clipPath id={idPrefix + '-clip'}><path d={shield}/></clipPath>
      </defs>

      <path d={shield} fill={SD.leather}/>
      <g clipPath={`url(#${idPrefix}-clip)`}>
        <rect x="0" y="0" width="320" height="340" fill={SD.leather} filter={`url(#${idPrefix}-leather)`}/>
      </g>
      <path d={shield} fill="none" stroke={SD.gold} strokeWidth="2.2"/>
      <path d={shieldInner} fill="none" stroke={SD.gold} strokeWidth="0.9"/>

      <g fill={SD.hi}>
        <circle cx="60" cy="50" r="2.4"/>
        <circle cx="160" cy="50" r="2.4"/>
        <circle cx="260" cy="50" r="2.4"/>
      </g>

      <g transform="translate(60 70) scale(1.0)">
        <BookMark size={200} idPrefix={idPrefix + '-bm'}/>
      </g>

      <g fill={SD.gold} transform="translate(160 280)">
        <path d="M -30 0 L -6 0 L 0 -6 L 6 0 L 30 0" stroke={SD.gold} strokeWidth="1.2" fill="none"/>
        <circle cx="0" cy="-6" r="2"/>
      </g>
    </svg>
  )
}

// Wordmark — "SKILL DICTIONARY" + Latin tagline
export function Wordmark({ color = SD.gold, ink = SD.hi, scale = 1, align = 'center' }) {
  const ta = align === 'center' ? 'center' : 'left'
  return (
    <div style={{ textAlign: ta, color }}>
      <div style={{
        fontFamily: 'Playfair Display, Georgia, serif',
        fontWeight: 800,
        fontSize: `${38 * scale}px`,
        letterSpacing: `${0.18 * scale}em`,
        lineHeight: 1,
        textTransform: 'uppercase',
        color,
      }}>
        Skill <span style={{ color: ink }}>·</span> Dictionary
      </div>
      <div style={{
        marginTop: `${8 * scale}px`,
        fontFamily: 'Cormorant Garamond, EB Garamond, Georgia, serif',
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: `${13 * scale}px`,
        letterSpacing: `${0.18 * scale}em`,
        color,
        opacity: 0.85,
      }}>
        — Ars sine scientia nihil —
      </div>
    </div>
  )
}
