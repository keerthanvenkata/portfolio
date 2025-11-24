# Master Plan

Single reference for architecture, UX, and roadmap decisions so anyone can ramp back up quickly.

## 1. Product Story

- **Site role**: Dual-purpose portfolio — "My Space" (dark neon personal lab) for friends/makers with travel, stories, playlists, and random content; "Professional Mode" (bright parchment) for recruiters/VCs with clean, formal presentation.
- **Personas**:
  - *My Space* (dark mode): Personal lab, informal, creative space — travel stories, music playlists, journal entries, random thoughts, lifestyle content.
  - *Professional Mode* (bright mode): Recruiter/VC-facing, formal, clean — technical deep-dives, professional insights, career highlights.
- **North Star**: One codebase, two skins, mostly shared content with theme-filtered sections (Blog, Outside Code subsections, future personal sections).

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

- **Layout**: Fixed sidebar (hover/pin), global header/footer, mobile hamburger overlay, theme toggle (top-right + sidebar bottom).
- **Hero**: Two-column layout with portrait slot (desktop). Portrait assets live in `public/media/portrait/`; drop-shadow stack documented in `style-guide`.
- **Content Modules**: Featured projects, blog summaries, experimental cards, quick links, timeline, modals (`ProjectModal`, `ExperimentalModal`, `BlogModal`).
- **Sections**:
  - **Universal** (both themes): Home, About, Projects, Experimental, Resume, Contact
  - **Theme-filtered**: Blog (posts with `theme` param), Outside Code (subsections with `theme` param)
  - **Future personal sections** (dark default, configurable): Travel, Stories/Journal, Playlists, Reading List, Photography
- **Utilities**: `Modal` base component, `ImageCarousel`, `VideoPlayer`, `PDFViewer`, `GitHubContributions`.
- **Docs Reference**:
  - Visual language → `docs/style-guide.md`
  - Bright/Professional mode spec → `docs/professional-version.md`
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

