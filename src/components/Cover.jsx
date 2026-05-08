import { useState } from 'react'
import { useBookSize } from '../hooks/useBookSize'
import logoSvg from '../assets/skill-dictionary-logo.svg'

function CornerArm({ color = '#b8913c' }) {
  return (
    <svg width="64" height="64" viewBox="0 0 80 80">
      <g fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
        <line x1="10" y1="10" x2="70" y2="10"/>
        <line x1="10" y1="10" x2="10" y2="70"/>
        <line x1="14" y1="14" x2="50" y2="14"/>
        <line x1="14" y1="14" x2="14" y2="50"/>
        <circle cx="14" cy="14" r="2" fill={color}/>
      </g>
    </svg>
  )
}

function CornerOrnaments() {
  return (
    <>
      <div className="cover-corner cover-corner-tl"><CornerArm/></div>
      <div className="cover-corner cover-corner-tr"><CornerArm/></div>
      <div className="cover-corner cover-corner-bl"><CornerArm/></div>
      <div className="cover-corner cover-corner-br"><CornerArm/></div>
    </>
  )
}

export default function Cover({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const { portrait, pageW, pageH } = useBookSize()

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    setTimeout(onOpen, 1050)
  }

  // Badge size: fills ~55% of the narrower cover dimension.
  // Portrait (mobile/tablet): cover is one page wide, so width is the constraint.
  // Landscape (desktop): cover is two pages wide, height becomes the constraint.
  const coverW = portrait ? pageW : pageW * 2
  const badgeSize = Math.round(Math.min(
    280,                    // maximum natural size
    pageH * 0.44,          // ≤44% of height (leaves room for wordmark + hint)
    coverW * 0.55          // ≤55% of width (prominent but not edge-to-edge)
  ))

  return (
    <div
      className={`cover ${opening ? 'opening' : ''}`}
      onClick={handleOpen}
      role="button"
      aria-label="Open the Skill Dictionary"
    >
      <div className="cover-front">
        <div className="cover-spine-strip" />
        <CornerOrnaments/>

        <div className="cover-badge-wrap">
          <img src={logoSvg} width={badgeSize} height={badgeSize} alt="Skill Dictionary emblem" draggable={false}/>
        </div>

        <div className="cover-wordmark">
          <div className="cover-wordmark-title">
            Skill <span className="cover-wordmark-dot">·</span> Dictionary
          </div>
          <div className="cover-wordmark-tagline">— Ars sine scientia nihil —</div>
          <div className="cover-wordmark-mono">A Reference of Craft · Vol. I</div>
        </div>

        <p className="cover-hint">— click to open —</p>
      </div>
      <div className="cover-back" />
    </div>
  )
}
