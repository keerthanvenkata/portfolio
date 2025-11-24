# Master Plan

Single reference for architecture, UX, and roadmap decisions so anyone can ramp back up quickly.

## 1. Product Story

- **Site role**: Personal laboratory for blogs, experiments, travel shorts, and entrepreneurial notes while still acting as a recruiter/VC-friendly profile.
- **Personas**:
  - *Explorers* (friends, makers) → default neon/dark mode, playful tone, fast iteration.
  - *Professionals* (recruiters, investors) → future bright mode with the same content surfaced more formally.
- **North Star**: One codebase, two skins, identical routes/content.

## 2. Architecture Snapshot

- **Content-first**: `backend/app/content/**` is the source of truth; `frontend/scripts/generate-content.mjs` emits API-shaped JSON + static assets.
- **Frontend**: React + Vite + Tailwind + Framer Motion. App shell in `frontend/src/App.tsx`, lazy routes for detail pages, modals for quick previews.
- **Backend**: FastAPI skeleton retained for future dynamic hosting; today we deploy static assets on Vercel.
- **Theme tokens**: CSS variables defined globally; future bright mode will reuse token system with `data-theme` attribute + persisted preference.

## 3. UX & Visual Pillars

| Pillar | Dark Mode (Current) | Bright Mode (Planned) |
| --- | --- | --- |
| Atmosphere | Neon cyberpunk, glass, animated gradients | Clean matte neutrals, soft shadows, restrained gradients |
| Accent Usage | Violet → Magenta → Electric Pink glows | Violet & magenta as line-work + CTAs only |
| Typography | Orbitron headings, Inter body | Same families, lighter weights + charcoal text |
| Interaction | Hover glows, motion, drop-shadows | Micro-elevation, subtle ink transitions |

## 4. Component Inventory

- **Layout**: Fixed sidebar (hover/pin), global header/footer, mobile hamburger overlay.
- **Hero**: Two-column layout with portrait slot (desktop). Portrait assets live in `public/media/portrait/`; drop-shadow stack documented in `style-guide`.
- **Content Modules**: Featured projects, blog summaries, experimental cards, quick links, timeline, modals (`ProjectModal`, `ExperimentalModal`, `BlogModal`).
- **Utilities**: `Modal` base component, `ImageCarousel`, `VideoPlayer`, `PDFViewer`, `GitHubContributions`.
- **Docs Reference**:
  - Visual language → `docs/style-guide.md`
  - Bright/Professional mode spec → `docs/professional_version.md`
  - Deployment process → `docs/vercel-deploy.md`

## 5. Roadmap (High Level)

1. **Docs & Hygiene** (current) — keep README + style guide + TODOs synced with implementation.
2. **Experimental Modal Parity** — polish until identical to project modal aesthetics/interactions.
3. **Background Enhancements** — shimmering stars layer, refine glow tokens, ensure performance budget holds.
4. **Professional/Bright Mode** — implement toggle + URL param, update tokens, ensure WCAG contrast, update docs/screenshots.
5. **Content Deep Dive** — fill About/Blog gaps, travel shorts, entrepreneurial write-ups, add recruiter-friendly summaries.
6. **Lightweight analytics** (optional) — e.g., cabin telemetry or privacy-friendly analytics to see how toggles are used.

## 6. Testing & Deployment

- **Accessibility & perf**: Follow `docs/checklist-a11y-performance.md`. Add bright-mode checks once shipped.
- **Paper-based testing**: Required before new unit tests/major features to trace hover/pin behavior, modals, theme toggles.
- **Deployment**: Static Vercel (`frontend/`, `npm run build`). No backend needed until FastAPI launch.

## 7. Guiding Principles

1. **Ship sequentially**: Finish and verify one task at a time; deploy between steps.
2. **Dark-first**: Never regress desktop/mobile dark experience while introducing new features.
3. **Document as you go**: Every UX/architecture decision belongs in docs (`README`, style guide, master plan, professional spec).
4. **Stay reversible**: Keep diffs scoped so we can roll back quickly if a deployment does not feel right.

