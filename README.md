# Keerthan.dev — Portfolio

A minimalist, modern, and maintainable portfolio built with React + Tailwind (static on Vercel), with a backend-first content pipeline that keeps the path open for a future FastAPI backend.

## Tech Stack

- Frontend: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion
- Content pipeline: Node (generate-content.mjs) → static JSON/assets
- Backend (future-ready): FastAPI skeleton + content directory
- Hosting: Vercel (static frontend for now)

## Architecture (Backend-First Content)

Source of truth for content lives in `backend/app/content/` and is compiled into static JSON + assets for the frontend to consume.

- Blog posts (Markdown): `backend/app/content/posts/*.md`
- Projects: `backend/app/content/projects.json`
- Experimental: `backend/app/content/experimental.json`
- Timeline: `backend/app/content/timeline.json`
- Social/config: `backend/app/content/social.json`
- Resume PDFs + metadata: `backend/app/content/resume/*`
- Media (images, videos): `backend/app/content/media/**`

During `npm run build` in `frontend/`:
- The generator transforms content → `frontend/public/api/*.json`
- Media copied → `frontend/public/media/`
- Resume copied → `frontend/public/resume/` with `resume-latest.pdf`

Frontend reads from these static endpoints (e.g. `/api/posts.json`). This mirrors a future FastAPI API so we can switch to dynamic hosting later without changing the frontend.

See details:
- docs/howto-add-content.md — how to add/update content
- docs/architecture-and-performance.md — pipeline, modals vs pages, performance

## Local Development

```bash
# From repo root
cd frontend
npm install
npm run dev
```

Optional: run prebuild to generate static data for dev (useful if you changed content):
```bash
npm run prebuild
```

## Build

```bash
cd frontend
npm run build
```

The build outputs to `frontend/dist/`.

## Deploy (Vercel)

Current deployment is the static frontend only.
- Framework Preset: Vite
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

Guide: docs/vercel-deploy.md

## Environment Variables (Optional)

- `VITE_API_BASE`: Base URL for API requests. Empty for static hosting (uses `/api/*`). When moving to a hosted FastAPI backend, set this to the backend origin.

## Project Structure (Selected)

```
backend/
  app/
    content/
      posts/                 # blog markdown
      projects.json
      experimental.json
      timeline.json
      social.json
      resume/
      media/
    ... FastAPI skeleton (not deployed yet)
frontend/
  public/
    api/                     # generated JSON
    media/                   # copied media
    resume/                  # copied PDFs
  src/
    components/
    pages/
    lib/api.ts               # fetches static JSON
  scripts/generate-content.mjs
  index.html
  vite.config.ts
```

## Modals vs Dedicated Pages

- Modals show a quick preview (subset): limited highlights, images, and truncated text (no videos).
- Dedicated pages show full content: all highlights, full tech stack, image carousel, video player, diagrams, related items.

## Accessibility & Performance

- Lazy-loaded routes with Suspense, on-hover route prefetch, idle prefetch
- Lazy images (`loading="lazy"`) and `decoding="async"`
- Lightweight skeletons while loading lists

## Updating Content (TL;DR)

1) Edit files under `backend/app/content/`
2) Build: `cd frontend && npm run build`
3) Deploy on Vercel (frontend only)

Full guide: docs/howto-add-content.md

---

© 2025 Venkata Keerthan Nimmala. All rights reserved.
