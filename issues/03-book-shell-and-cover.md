# Issue 3 — Book shell + cover

**Type:** AFK
**Label:** needs-triage

## What to build

Implement the `Book` component wrapping `react-pageflip`, the leather `Cover` component with open animation, and the full CSS design system. This establishes the visual foundation and page-flip mechanics that all content pages plug into.

End-to-end: the browser shows a dark leather book cover with gold-embossed title "Jordan's Skill Dictionary". On load, the cover animates open to reveal a two-page cream spread with visible spine. The book uses the full aged-paper design system throughout.

## Acceptance criteria

- [ ] `react-pageflip` renders a 900×620px two-page book spread
- [ ] Leather cover (`#3d1c02`) with gold-embossed title renders on first load
- [ ] Cover animates open automatically, transitioning to the book interior
- [ ] CSS custom properties defined for full design system: `--color-page`, `--color-ink`, `--color-gold`, `--color-cover`, font stacks, page dimensions
- [ ] Google Fonts loaded: Playfair Display, Lora, Source Code Pro
- [ ] Subtle paper grain texture applied to page backgrounds
- [ ] Visible book spine rendered in the center of the spread
- [ ] Book spread scales down via `transform: scale()` on viewports narrower than 900px

## Blocked by

- Issue #1 — Project scaffold
