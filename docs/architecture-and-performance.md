# Portfolio Architecture & Performance Notes

This document explains how the site is organized (content-first), how the static deployment works today, and what performance optimizations are in place.

## Content-First Architecture

- Source of truth for content lives under `backend/app/content/`.
  - Blog posts: `backend/app/content/posts/*.md` (frontmatter + markdown)
  - Projects: `backend/app/content/projects.json`
  - Experimental: `backend/app/content/experimental.json`
  - Timeline (career/education): `backend/app/content/timeline.json`
  - Social/config: `backend/app/content/social.json`
  - Media: `backend/app/content/media/**`
  - Resume: `backend/app/content/resume/{resume-*.pdf}`, `resume.json`

- During build (`npm run build` in `frontend/`), the script `frontend/scripts/generate-content.mjs`:
  - Parses blog markdown → `frontend/public/api/posts.json` and `frontend/public/api/posts/{id}.json`
  - Combines projects + experimental → `frontend/public/api/projects.json` and per-item JSON files
  - Copies media → `frontend/public/media/**`
  - Copies resume PDFs → `frontend/public/resume/` and writes `resume-latest.pdf`
  - Copies timeline and social configs → `frontend/public/api/timeline.json`, `frontend/public/api/social.json`

- The frontend reads from these static JSON endpoints (e.g., `/api/posts.json`).
- This keeps an easy migration path to a real API later (FastAPI already present).

## Deployment Mode

- Current: Static hosting on Vercel for the frontend only.
- Future: Enable FastAPI backend for dynamic serving; the frontend already supports switching `VITE_API_BASE` via env if needed.

## Modal vs Detail Pages

- Modals show a curated preview (few highlights, limited images, truncated text).
- Detail pages show full content (full tech stack, all highlights, image carousel, videos, diagrams).

## Performance Optimizations

### 1) Lazy Routes (Code Splitting)
- Detail pages and some heavier routes are lazy-loaded with React.lazy and Suspense.
- Files:
  - `frontend/src/App.tsx` (lazy imports for detail routes and About/Contact)

### 2) On-Hover Prefetch
- When the user hovers links to heavy routes (detail pages, About, Contact), we prefetch the route chunks.
- Files:
  - `frontend/src/App.tsx` (prefetch helpers: `prefetchProjectDetail`, `prefetchBlogDetail`, `prefetchExperimentalDetail`, `prefetchAbout`, `prefetchContact`)

### 3) Idle Prefetch
- After initial render, we prefetch likely-next routes using `requestIdleCallback` (with a setTimeout fallback).
- Files:
  - `frontend/src/App.tsx` (idle prefetch `useEffect`)

### 4) Lazy Images
- All carousel images specify `loading="lazy"` and `decoding="async"` to reduce main thread blocking and bandwidth.
- Files:
  - `frontend/src/components/ImageCarousel.tsx`

### 5) Skeleton States
- Projects and Blog list pages show skeletons while fetching.
- Files:
  - `frontend/src/App.tsx` (inside `ProjectsPage` and `BlogPage`)

## Optional Enhancements (Future)

- Add `srcset` and `sizes` for images if 2x assets exist (see below).
- Bundle analysis and vendor chunk splitting if needed.
- Service Worker for offline (optional).

## Adding HiDPI Images (Optional)

If you maintain 1x and 2x images, use this naming convention:
- `image.png` (1x), `image@2x.png` (2x)

Then update the carousel to use:
```tsx
<img
  src={`/media/${image}`}
  srcSet={`/media/${image} 1x, /media/${image.replace(/(\.[a-z]+)$/i, '@2x$1')} 2x`}
  sizes="(max-width: 768px) 100vw, 800px"
  loading="lazy"
  decoding="async"
/>
```
(Only recommended if you actually have 2x assets to avoid 404s.)

## How to Update Content

1. Edit files under `backend/app/content/` (posts, projects, experimental, timeline, resume, media).
2. Build: `cd frontend && npm run build`.
3. Deploy to Vercel (frontend/static).

This preserves easy maintainability while keeping a clear path to a full backend later.
