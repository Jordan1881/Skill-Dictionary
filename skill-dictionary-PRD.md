# PRD — Skill Dictionary

## Problem Statement

As a developer who maintains a growing library of Claude skills, I have no way to visually browse, read, or reference my skills outside of the terminal. Finding a skill means remembering its name and path. Reading it means opening a raw markdown file. There is no at-a-glance overview of what skills exist, what they do, or how they relate to each other.

## Solution

A local web app styled as an interactive dictionary book. Skills are displayed on aged-paper pages with a realistic page-flip animation. The left page is a domain-grouped index — click any skill to jump to it, or drag the pages to browse sequentially. The right page renders the skill's markdown content with proper formatting. The book reads directly from `~/.claude/skills/` at runtime so it always reflects the current state of the skill library.

## User Stories

1. As a developer, I want to open the skill dictionary in my browser with a single command, so that I don't have to configure anything to use it.
2. As a developer, I want to see an animated leather book cover when I first open the app, so that the experience feels intentional and polished.
3. As a developer, I want the cover to open automatically into the book view, so that I can start browsing immediately.
4. As a developer, I want to see all my skills grouped by domain on the left page, so that I can quickly find skills by category.
5. As a developer, I want domain groups displayed as leather bookmark tabs on the index page, so that I can jump between categories visually.
6. As a developer, I want to click any skill name in the index to navigate directly to that skill's page, so that I can look up a specific skill without flipping through every page.
7. As a developer, I want to drag the page edge to flip to the next or previous skill, so that I can browse casually like reading a real book.
8. As a developer, I want the page-flip animation to look physically realistic, so that the book metaphor feels immersive.
9. As a developer, I want each skill's content rendered as formatted markdown on the right page, so that tables, code blocks, and headers are readable.
10. As a developer, I want the YAML frontmatter stripped from the rendered content, so that I only see the human-readable skill documentation.
11. As a developer, I want the first letter of each skill's description rendered as a large drop cap, so that the page feels like a real dictionary entry.
12. As a developer, I want ornamental dividers between major sections of a skill, so that the page has visual hierarchy.
13. As a developer, I want page numbers displayed in Roman numerals at the bottom of each page, so that the book aesthetic is consistent.
14. As a developer, I want the book to use cream-colored pages, dark brown ink, and gold accents, so that it looks like an aged reference book.
15. As a developer, I want the body text rendered in Lora and headings in Playfair Display, so that the typography matches the aged-paper aesthetic.
16. As a developer, I want code blocks rendered in Source Code Pro, so that technical content is still readable within the book theme.
17. As a developer, I want a subtle paper grain texture on each page, so that the pages feel tactile and not flat.
18. As a developer, I want the skill index to always reflect my current skills without a rebuild, so that newly added skills appear automatically on next page load.
19. As a developer, I want the app to load skills from `~/.claude/skills/` on the server side, so that no manual configuration of paths is needed.
20. As a developer, I want sub-skills (plugin namespaced skills like `grill-me`, `to-prd`) to be parsed and grouped correctly, so that my full skill library is visible.
21. As a developer, I want the book to be responsive on smaller screens, so that I can use it on a laptop without horizontal scrolling.
22. As a developer, I want a single-page view (not a spread) on screens below 768px wide, so that the book is readable on smaller viewports.
23. As a developer, I want the skill index to become a slide-in drawer on mobile, so that the full page width is available for content on small screens.
24. As a developer, I want swipe-left/right gestures to navigate between skills on mobile, so that I can browse without needing arrow buttons.
25. As a developer, I want the book spread to scale down gracefully on medium-sized screens, so that the layout doesn't break between mobile and desktop.
26. As a developer, I want a visible book spine in the center of the spread, so that the two-page layout feels like a bound book.
27. As a developer, I want loading state handled gracefully while skills are being fetched, so that the UI doesn't flash or break on startup.
28. As a developer, I want errors surfaced clearly if the skills directory can't be read, so that I know what's wrong without inspecting the console.

## Implementation Decisions

### Modules

- **`server/skillsParser.js`** — Core parsing module. Recursively walks `~/.claude/skills/`, reads every `SKILL.md`, uses `gray-matter` to separate frontmatter from content, extracts `name`, `description`, `domain`, and `triggers` from metadata. Returns an array of structured skill objects. This is the deepest module — all filesystem and parsing complexity is encapsulated here behind a simple `parseSkills()` interface.

- **`server/index.js`** — Thin Express server. Mounts `/api/skills` route that calls `skillsParser.parseSkills()` and returns JSON. Serves the Vite-built React app as static files in production. In development, Vite dev server proxies API calls to Express.

- **`src/hooks/useSkills.js`** — Custom React hook. Fetches from `/api/skills` on mount, manages `loading`, `error`, and `skills` state. Groups skills by `domain` for the index. Memoizes the grouped result. All data-fetching logic isolated here — components never fetch directly.

- **`src/components/Book.jsx`** — Central stateful component. Owns `currentPage` state. Wraps `react-pageflip`. Handles index-click navigation (jump to page by skill ID) and drag-to-flip (built into react-pageflip). Renders `Cover`, `SkillIndex`, and `SkillPage` as children in the correct page slots.

- **`src/components/Cover.jsx`** — Renders the leather book cover. Triggers open animation on mount. Passes control back to `Book` when animation completes.

- **`src/components/SkillIndex.jsx`** — Left page. Receives grouped skills from `Book`. Renders domain sections as leather bookmark tabs. Renders skill names as clickable links. Calls `Book`'s navigate handler on click.

- **`src/components/SkillPage.jsx`** — Right page. Receives a single skill object. Renders content via `react-markdown` + `remark-gfm`. Applies drop cap to first paragraph. Renders ornamental dividers between `##` sections. Purely presentational.

- **`src/styles/theme.css`** — CSS custom properties for the full design system: color palette, font stack, page dimensions, texture overlay, responsive breakpoints.

### API Contract

`GET /api/skills` returns:
```json
[
  {
    "name": "grill-me",
    "domain": "ai-engineering",
    "description": "...",
    "triggers": ["..."],
    "content": "stripped markdown content"
  }
]
```

### Architecture Decisions
- Vite dev server proxies `/api/*` to Express on port 3001 during development
- `react-pageflip` manages all page-turn animation and drag state
- `gray-matter` runs server-side only — raw frontmatter never sent to client
- Skills are re-read from disk on every `/api/skills` request (no server-side cache) so edits appear on refresh

## Testing Decisions

**What makes a good test:** Tests verify external behavior through the module's public interface, not implementation details. A good test for `skillsParser` checks that given a directory of SKILL.md files, the correct structured objects come out — it does not test which internal functions were called.

**Modules to test:**

- **`server/skillsParser.js`** — Unit tests using a fixture directory of mock SKILL.md files. Verify: correct name extraction, frontmatter stripped from content, domain grouping, missing metadata handled gracefully, nested plugin-namespaced skills parsed correctly.

- **`src/hooks/useSkills.js`** — Tests using `@testing-library/react` + `msw` to mock the `/api/skills` endpoint. Verify: loading state on mount, skills populated on success, error state on API failure, grouped-by-domain output structure.

## Out of Scope

- Authentication or access control (personal local tool only)
- Editing or creating skills from within the UI
- Search or filtering within the index
- Deployment to a remote server or hosting
- Support for non-SKILL.md files in the skills directory
- Syntax highlighting within code blocks (plain monospace is sufficient)
- Dark mode

## Further Notes

- The book spread is fixed at 900×620px and scales via CSS `transform: scale()` to fit smaller viewports — this avoids responsive layout complexity inside the book itself
- `react-pageflip` requires pages to be direct children with equal dimensions — `SkillIndex` and `SkillPage` must both be exactly 450×620px
- Skills without a `metadata.domain` field should fall into an "Uncategorized" group rather than being silently dropped
- The Express server and Vite dev server should be startable with a single `npm run dev` command using `concurrently`
