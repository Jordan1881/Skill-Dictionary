# Issue 7 — Mobile view

**Type:** AFK
**Label:** needs-triage

## What to build

Implement the responsive mobile layout for viewports below 768px. The two-page spread collapses to a single-page view, the skill index becomes a slide-in drawer, and swipe-left/right navigates between skills.

End-to-end: on a 375px viewport, the user sees a single cream page showing the current skill. A drawer toggle button opens the index. Swiping left advances to the next skill; swiping right goes back.

## Acceptance criteria

- [ ] Below 768px: book renders as a single page (no spread, no spine)
- [ ] Skill index hidden by default on mobile, accessible via a drawer toggle button
- [ ] Drawer slides in from the left and shows the full domain-grouped index
- [ ] Swipe-left gesture navigates to the next skill
- [ ] Swipe-right gesture navigates to the previous skill
- [ ] Book spread scales gracefully on medium viewports (768px–900px) via `transform: scale()`
- [ ] No horizontal scrolling at any viewport width

## Blocked by

- Issue #4 — Index page
- Issue #5 — Skill reader page
- Issue #6 — Page-flip navigation
