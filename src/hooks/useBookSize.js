import { useState, useEffect } from 'react'

// ── Layout policy constants ──────────────────────────────────────
// All layout decisions live here. Change values in one place.

/** Viewport width below which the book switches to single-page portrait mode. */
export const PORTRAIT_BREAKPOINT = 900

/** Native page dimensions in landscape mode (width × height in px). */
export const PAGE_NATIVE_W = 450
export const PAGE_NATIVE_H = 620

/** Aspect ratio of a single page (width / height). */
export const PAGE_ASPECT_RATIO = PAGE_NATIVE_W / PAGE_NATIVE_H // ≈ 0.726

/** Minimum margin around the book (both axes) in landscape mode. */
export const LANDSCAPE_MARGIN = 40

// ────────────────────────────────────────────────────────────────

/**
 * Compute page dimensions for the current viewport.
 * Pure function — no side effects. Exported for unit testing.
 *
 * @param {number} viewportW - window.innerWidth
 * @param {number} viewportH - window.innerHeight
 * @returns {{ portrait: boolean, pageW: number, pageH: number }}
 */
export function computeLayout(viewportW, viewportH) {
  if (viewportW >= PORTRAIT_BREAKPOINT) {
    // Landscape: two-page spread fills the viewport minus margin.
    // Constrain by both width and height to maintain aspect ratio.
    const maxPageW = (viewportW - LANDSCAPE_MARGIN) / 2
    const maxPageH = viewportH - LANDSCAPE_MARGIN
    const byWidth  = { w: maxPageW, h: maxPageW / PAGE_ASPECT_RATIO }
    const byHeight = { w: maxPageH * PAGE_ASPECT_RATIO, h: maxPageH }
    const fit = byWidth.h <= maxPageH ? byWidth : byHeight
    return { portrait: false, pageW: Math.floor(fit.w), pageH: Math.floor(fit.h) }
  }
  // Portrait (phone / iPad portrait): single page fills the viewport.
  return { portrait: true, pageW: viewportW, pageH: viewportH }
}

/**
 * React hook wrapping `computeLayout` with a resize listener.
 * @returns {{ portrait: boolean, pageW: number, pageH: number }}
 */
export function useBookSize() {
  const [size, setSize] = useState(() =>
    typeof window !== 'undefined'
      ? computeLayout(window.innerWidth, window.innerHeight)
      : { portrait: false, pageW: PAGE_NATIVE_W, pageH: PAGE_NATIVE_H }
  )

  useEffect(() => {
    const update = () =>
      setSize(computeLayout(window.innerWidth, window.innerHeight))
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return size
}
