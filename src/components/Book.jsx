import React, { useRef, useState, useCallback } from 'react'
import HTMLFlipBook from 'react-pageflip'
import SkillPage from './SkillPage'
import TOCPage from './TOCPage'
import TOCDrawer from './TOCDrawer'
import InsideCoverPage from './InsideCoverPage'

// Every page passed to react-pageflip must be a forwardRef
const Page = React.forwardRef(({ children }, ref) => (
  <div ref={ref} className="page-inner">
    {children}
  </div>
))
Page.displayName = 'Page'

// Skills start at page index 2 (after inside-cover + TOC)
const SKILL_OFFSET = 2

export default function Book({ skills, grouped, portrait, pageW, pageH }) {
  const bookRef = useRef()
  const [currentSkillIdx, setCurrentSkillIdx] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const handleSelectSkill = useCallback((skillName) => {
    const idx = skills.findIndex(s => s.name === skillName)
    if (idx === -1) return
    setCurrentSkillIdx(idx)
    bookRef.current?.pageFlip().flip(idx + SKILL_OFFSET)
  }, [skills])

  const handleFlip = useCallback((e) => {
    const pageIdx = e.data
    setCurrentPage(pageIdx)
    if (pageIdx >= SKILL_OFFSET) {
      setCurrentSkillIdx(pageIdx - SKILL_OFFSET)
    }
  }, [])

  const flipPrev = useCallback((e) => {
    e.stopPropagation()
    bookRef.current?.pageFlip().flipPrev()
  }, [])

  const flipNext = useCallback((e) => {
    e.stopPropagation()
    bookRef.current?.pageFlip().flipNext()
  }, [])

  // Pad to even number of pages so the last spread is complete
  const skillPages = [...skills]
  if (skillPages.length % 2 !== 0) skillPages.push(null)

  const totalPages = SKILL_OFFSET + skillPages.length
  const canGoPrev = currentPage > 0
  const canGoNext = currentPage < totalPages - 1

  return (
    <div className="book-stage">
      {/* Portrait-mode: floating TOC drawer replaces the TOC page for easy navigation */}
      {portrait && (
        <TOCDrawer
          grouped={grouped}
          currentSkill={skills[currentSkillIdx]?.name}
          onSelect={handleSelectSkill}
        />
      )}

      {/* key forces remount when layout changes (resize / orientation flip) */}
      <HTMLFlipBook
        key={`${portrait}-${pageW}-${pageH}`}
        ref={bookRef}
        width={pageW}
        height={pageH}
        size="fixed"
        usePortrait={portrait}
        showCover={false}
        mobileScrollSupport={true}
        disableFlipByClick={true}
        maxShadowOpacity={0.55}
        flippingTime={850}
        drawShadow={true}
        onFlip={handleFlip}
        className="flip-book"
        startPage={0}
      >
        {/* Page 0 – inside cover decoration */}
        <Page key="inside-cover">
          <InsideCoverPage />
        </Page>

        {/* Page 1 – Table of Contents (also accessible via drawer on portrait) */}
        <Page key="toc">
          <TOCPage
            grouped={grouped}
            currentSkill={skills[currentSkillIdx]?.name}
            skillCount={skills.length}
            onSelect={handleSelectSkill}
          />
        </Page>

        {/* Pages 2+ – Skills */}
        {skillPages.map((skill, i) => (
          <Page key={skill?.name ?? `blank-${i}`}>
            {skill
              ? <SkillPage skill={skill} pageNumber={i + 1} />
              : <BlankPage />
            }
          </Page>
        ))}
      </HTMLFlipBook>

      {/* Rendered AFTER the flipbook so they sit above its corner hit-areas in the stacking order */}
      <button
        className="nav-arrow nav-arrow-prev"
        onPointerDown={flipPrev}
        disabled={!canGoPrev}
        aria-label="Previous page"
      >
        ←
      </button>
      <button
        className="nav-arrow nav-arrow-next"
        onPointerDown={flipNext}
        disabled={!canGoNext}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  )
}

function BlankPage() {
  return (
    <div className="blank-page">
      <div className="blank-ornament">❧</div>
    </div>
  )
}
