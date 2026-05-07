# Issue 1 — Project scaffold

**Type:** AFK
**Label:** needs-triage

## What to build

Set up the full project scaffold so both the Express server and Vite+React dev server run with a single `npm run dev` command. This is the foundation every other slice builds on.

End-to-end: running `npm run dev` starts Express on port 3001 and Vite on port 5173, Vite proxies `/api/*` to Express, and a blank React app loads in the browser with no errors.

## Acceptance criteria

- [ ] `npm run dev` starts both Express and Vite via `concurrently`
- [ ] Vite dev server proxies `/api/*` requests to Express on port 3001
- [ ] React app renders without errors in the browser
- [ ] `npm run build` produces a static build that Express can serve
- [ ] Project structure matches: `server/`, `src/`, `public/` directories exist

## Blocked by

None — can start immediately.
