import { useState } from 'react'

export default function Cover({ onOpen }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    setTimeout(onOpen, 1050)
  }

  return (
    <div
      className={`cover ${opening ? 'opening' : ''}`}
      onClick={handleOpen}
      role="button"
      aria-label="Open the Skill Dictionary"
    >
      <div className="cover-front">
        <div className="cover-spine-strip" />
        <div className="cover-ornament">✦</div>
        <h1 className="cover-title">
          Jordan's<br />Skill Dictionary
        </h1>
        <div className="cover-ornament">✦</div>
        <p className="cover-subtitle">A Reference of Craft</p>
        <p className="cover-hint">— click to open —</p>
      </div>
      <div className="cover-back" />
    </div>
  )
}
