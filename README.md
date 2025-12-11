# Keerthan.dev Monorepo

FastAPI backend (content as files) + React/Vite/Tailwind frontend. The backend folder contains the canonical content (Markdown/JSON/media). The frontend build step reads and emits static JSON and copies media for deployment.

## Run locally (Windows)

1) Backend (optional for local API dev)
```
cd backend
./run_dev.ps1
```
API: `http://127.0.0.1:8000` (serves `/media/*` if you run the backend).

2) Frontend
```
cd frontend
npm install
npm run prebuild   # generates public/api and copies media
npm run dev
```
Frontend: `http://127.0.0.1:5173`.

Or run both from the repo root:
```
./run_all.ps1
```

## Content authoring (source of truth)

All content is in `backend/app/content/`:
- Blog posts: `posts/*.md` with YAML frontmatter.
- Projects: `projects.json` (supports `featured`, `images`, `video`, `videoPoster`, etc.).
- Experimental: `experimental.json`.
- Timeline: `timeline.json` (About page).
- Social: `social.json`.
- Media: `media/**` (images/videos placed here).

During `npm run prebuild` (or `npm run build`) in `frontend/`, the script:
- Reads Markdown/JSON from `backend/app/content`
- Emits static JSON under `frontend/public/api`
- Copies media to `frontend/public/media`

Do not edit `frontend/public/api/*` by hand; it is generated.

## Projects: video + poster rules

Each project entry in `backend/app/content/projects.json` may include:
```json
{
  "id": "my-project",
  "title": "My Project",
  "images": ["projects/my-project/shot-1.jpg", "projects/my-project/shot-2.jpg"],
  "video": "https://www.loom.com/embed/xxxxxxxx"  // or "projects/my-project/demo.mp4"
  "videoPoster": "projects/my-project/video-poster.jpg"
}
```

- Modal behavior: shows a single representative image (prefers `videoPoster` when a video exists; otherwise uses the first image). It does not embed the video in the modal.
- Detail page: shows full media gallery (carousel) and the playable video.
  - If `video` is an external embed (Loom/YouTube iframe URL), it renders an iframe.
  - If `video` is self‑hosted (path under `/media`), it uses the built-in player.

### External video (Loom/YouTube)
- The detail page iframe shows the platform’s preview image.
- The modal still uses `videoPoster` (or falls back to the first screenshot) because the modal does not load the iframe.

### Self‑hosted video: generate a poster (Windows)
Use ffmpeg to extract a thumbnail and set `videoPoster`:
```powershell
# Extract a frame at 2s and scale to width 1280 (keeps aspect)
ffmpeg -ss 00:00:02 -i "backend\app\content\media\projects\my-project\demo.mp4" `
       -vframes 1 -vf "scale=1280:-1" -q:v 2 `
       "backend\app\content\media\projects\my-project\video-poster.jpg"
```
Then in `projects.json`:
```json
{
  "video": "projects/my-project/demo.mp4",
  "videoPoster": "projects/my-project/video-poster.jpg"
}
```

## Deploy (Vercel, static)

Project root for Vercel: `frontend`
- Build Command: `npm run build`
- Output: `dist`
- The prebuild step emits `public/api/*` and copies `public/media/*`.

Cache busting and headers are configured so content updates reflect immediately after deploy.

# Keerthan.dev — Portfolio

Personal playground + professional profile for Keerthan Venkata Nimmala. The dark “neon lab” is the default experience for storytelling, experiments, travel shorts, and long-form blogs; a future bright/professional mode will share the same content but present a clean recruiter/VC-ready skin that can be deep linked from resumes.

## Tech Stack

- Frontend: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion
- Content pipeline: Node (generate-content.mjs) → static JSON/assets
- Backend (future-ready): FastAPI skeleton + content directory
- Hosting: Vercel (static frontend for now)
- Theme plan: Dark neon default, bright “professional version” toggle (URL param + UI switch, see `docs/professional_version.md`)

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
- `docs/howto-add-content.md` — add/update content & assets
- `docs/style-guide.md` — full visual language + neon palette
- `docs/professional_version.md` — bright-mode concept & requirements
- `docs/MASTER_PLAN.md` — architecture + UX roadmap
- `docs/architecture-and-performance.md` — content pipeline, perf strategy

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
- Checklist lives in `docs/checklist-a11y-performance.md` (include future bright mode contrast check + toggle keyboard access)

## Updating Content (TL;DR)

1) Edit files under `backend/app/content/`
2) Build: `cd frontend && npm run build`
3) Deploy on Vercel (frontend only)

Full guide: docs/howto-add-content.md

---

© 2025 Venkata Keerthan Nimmala. All rights reserved.
