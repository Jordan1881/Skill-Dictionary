import { useState, useEffect } from 'react'
import TOCList from './TOCList'

export default function TOCDrawer({ grouped, currentSkill, onSelect }) {
  const [open, setOpen] = useState(false)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleSelect = (skillName) => {
    onSelect(skillName)
    setOpen(false)
  }

  return (
    <>
      {/* Floating hamburger button */}
      <button
        className="toc-drawer-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="toc-drawer-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div className={`toc-drawer-panel ${open ? 'toc-drawer-open' : ''}`}>
        <div className="toc-drawer-header">
          <span className="toc-drawer-title">Contents</span>
          <button
            className="toc-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="toc-drawer-scroll">
          <TOCList grouped={grouped} currentSkill={currentSkill} onSelect={handleSelect} />
        </div>
      </div>
    </>
  )
}
