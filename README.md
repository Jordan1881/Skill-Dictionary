# Skill Dictionary

An interactive web app for browsing your Claude skill library. Skills are displayed inside an animated, leather-bound book with realistic page-flip transitions — styled like an aged reference dictionary.

![Book UI](https://img.shields.io/badge/status-live-brightgreen)

## What it does

- Reads all skills from `~/.claude/skills/` at runtime — no rebuild needed when you add skills
- Groups skills by domain in a clickable index on the left page
- Renders each skill's markdown content on the right page (frontmatter stripped, drop caps, ornamental dividers)
- Page-flip animation with drag-to-browse support via `react-pageflip`
- Responsive: single-page view + slide-in drawer on mobile, scaled spread on desktop

## Tech stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Vite |
| Page flip | react-pageflip |
| Markdown | react-markdown + remark-gfm |
| Frontmatter parsing | gray-matter (server-side only) |
| Dev server | Express (proxied by Vite in dev) |
| Tests | Vitest + Testing Library + msw |
| Deploy | Vercel (static export) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The Express API runs on port 3001 and is proxied automatically by Vite.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Express + Vite dev server together |
| `npm run build` | Production build to `dist/` |
| `npm run export-skills` | Pre-export skills to `public/skills.json` for static deploy |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## How skills are loaded

**Development:** Express serves `GET /api/skills` — reads `~/.claude/skills/` on every request so edits appear on refresh without a rebuild.

**Production (Vercel):** Run `npm run export-skills` before deploying. This writes a snapshot to `public/skills.json`, which the static build serves directly.

## Project structure

```
src/
  components/
    Book.jsx          # Central stateful component, owns page state
    Cover.jsx         # Animated leather cover
    SkillPage.jsx     # Right page — renders skill markdown
    TOCPage.jsx       # Left page — domain-grouped index
    TOCDrawer.jsx     # Mobile slide-in index
  hooks/
    useSkills.js      # Fetches and groups skills, manages loading/error state
  styles/
    theme.css         # Design tokens: colors, fonts, dimensions, texture
server/
  index.js            # Express API server
  skillsParser.js     # Walks ~/.claude/skills/, parses SKILL.md frontmatter
scripts/
  export-skills.js    # Pre-exports skills for static/Vercel deploy
tests/
  skillsParser.test.js
  useSkills.test.jsx
```

## API

`GET /api/skills` returns an array of skill objects:

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

Skills without a `domain` field in their frontmatter are grouped under **Uncategorized**.

## Out of scope

- Auth / access control (personal local tool)
- Editing or creating skills from the UI
- Search / filtering
- Syntax highlighting in code blocks
- Dark mode
