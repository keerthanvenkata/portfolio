# HOWTO: Add or Update Content

This site is content-first. All content lives under `backend/app/content/` and is generated into static JSON/assets during `npm run build` in `frontend/`.

Quick workflow
1) Edit files under `backend/app/content/`
2) Build: `cd frontend && npm run build`
3) Deploy on Vercel (frontend only)

---

## Resume

- Place your PDF in:
  - `backend/app/content/resume/resume-v1.pdf` (you can add `resume-v2.pdf`, etc.)
- Update metadata:
  - `backend/app/content/resume/resume.json`
  - Example:
    ```json
    {
      "current_version": "v1",
      "versions": [
        {
          "version": "v1",
          "filename": "resume-v1.pdf",
          "date": "2025-01-28",
          "description": "Updated resume",
          "is_latest": true
        }
      ],
      "metadata": { "last_updated": "2025-01-28", "total_versions": 1 }
    }
    ```
- Build will copy PDFs to `frontend/public/resume/` and create `resume-latest.pdf`.

## Projects (Professional)

- Edit `backend/app/content/projects.json`.
- Minimal item template:
  ```json
  {
    "id": "your-project-id",
    "title": "Project Name",
    "role": "Your Role",
    "description": "Short overview of the project",
    "contribution": "What you did",
    "tech": ["React", "FastAPI", "PostgreSQL"],
    "link": "https://example.com",
    "status": "Live",
    "images": [
      "projects/your-project-id/screenshots/shot-1.png",
      "projects/your-project-id/diagrams/arch.png"
    ],
    "video": "projects/your-project-id/videos/demo.mp4",
    "videoPoster": "projects/your-project-id/screenshots/thumbnail.jpg",
    "highlights": [
      "Key impact or metric",
      "Another highlight"
    ],
    "featured": true,
    "kind": "project"
  }
  ```

## Experimental / Hobby Projects

- Edit `backend/app/content/experimental.json`.
- Same structure as projects; ensure `"kind": "experimental"`.

## Blog Posts

- Create Markdown files under `backend/app/content/posts/`.
- Template:
  ```markdown
  ---
  id: unique-post-id
  category: Tech
  title: Post Title
  excerpt: One-liner summary
  date: 2025-01-28
  featured: true
  author: Your Name
  ---

  Your markdown content here. Code blocks, images, etc.
  ```
- **Author**: Optional. Defaults to "Keerthan Venkata" if omitted. Set `author: "Other Name"` for guest or client posts.
- **Content**: Dark and light (professional) modes show the same blog content; there is no theme-based filtering of posts. Life-related or personal essays can live in the Life section instead (see Life Section below).
- The generator renders HTML and emits `posts.json` and per-post JSON.

## Timeline (Career + Education)

- Edit `backend/app/content/timeline.json`.
- Template item:
  ```json
  {
    "id": "exp-company-role",
    "type": "experience", // or "education"
    "title": "Title or Degree",
    "organization": "Company or Institution",
    "location": "City, Country",
    "start": "2024-01-01",
    "end": null,
    "highlights": ["Achievement 1", "Achievement 2"]
  }
  ```

## Social / Contact

- Edit `backend/app/content/social.json`.
- Template:
  ```json
  {
    "github_username": "your-handle",
    "linkedin_url": "https://www.linkedin.com/in/your-profile/",
    "github_url": "https://github.com/your-handle",
    "email": "you@example.com",
    "website": "https://your.site"
  }
  ```
- GitHub contributions chart uses `github_username`.

## Technology and Tools (tech stack)

- **Source of truth:** `backend/app/content/tech-stack.json`
- Structure:
  ```json
  {
    "sectionTitle": "Technology and Tools",
    "items": [
      { "name": "Python", "logo": "/tech-logos/python.svg", "url": "https://www.python.org" },
      { "name": "Cursor", "url": "https://cursor.com" }
    ]
  }
  ```
- Logo files live in `frontend/public/tech-logos/` (add SVGs there; reference as `/tech-logos/filename.svg`). Omit `logo` to show the first letter.
- Build copies this file to `frontend/public/api/tech-stack.json`; the About page loads it from the API.

## Life Section (planned)

- **Name**: **Life** is a single top-level nav item and a distinct area of the site.
- **Structure**: One route `/life` with in-page sections and smooth scroll. **Sections not final** — candidates include Music (with **Spotify playlists**; integration UX TBD — collapsible, mini-player, or tiles→player, etc.), Travel, Food, Thoughts; more may be added. Sticky mini-nav for section jumps. No sub-routes in the main nav. See `docs/life-section-plan.md` for discussion.
- **Content source**: TBD (e.g. `backend/app/content/life.json` or per-section files).
- **Theme**: Life has its own visual theme; **exact style TBD** (e.g. Golden Hour, film nostalgia, or other). The site-wide dark/light toggle does **not** appear on the Life page. Implement via e.g. `body[data-section="life"]` with its own CSS tokens when style is decided; keep typography, layout system, and motion consistent so it feels like the same person, different mood.
- **Blog for Life**: Life-focused or personal blog-style content lives inside Life (e.g. Thoughts subsection); no need for a separate theme toggle for "life" vs "professional" posts in the main blog.

## Media (Images, Diagrams, Videos)

- Place files under `backend/app/content/media/`:
  ```
  media/
  ├── projects/{project-id}/screenshots/*
  ├── projects/{project-id}/diagrams/*
  ├── projects/{project-id}/videos/*
  ├── blog/{post-id}/*
  ├── life/{section-id}/*
  ├── screenshots/*
  ├── diagrams/*
  └── videos/*
  ```
- Reference media paths in JSON/MD exactly as stored under `media/`, e.g. `"projects/your-project-id/screenshots/shot-1.png"`.
- Build copies these to `/media/` under the frontend.

### Hero Portraits

- Folder: `backend/app/content/media/portrait/`.
- Default assets mirrored to `frontend/public/media/portrait/` during build.
- Current lineup:
  - `13.png` — Illustrated full body with red aura (default).
  - `19.png` — Legacy full body.
  - `3.png` — Thigh-length.
  - `5.jpeg` — Half body (convert to PNG for transparency when possible).
- Update the `PORTRAIT_IMAGE` constant inside the `HomePage` component to switch the active image.
- PNG with transparent background is preferred; otherwise the checker pattern is visible.

## Logo

### Logo Requirements

**Shape:**
- **MUST be circular** - The logo must maintain a circular shape (`rounded-full`)
- This is a design requirement for consistency across the site
- Works well with the sidebar hover behavior (floating logo when collapsed)

**Sizes:**
- **Small**: 32px × 32px (`w-8 h-8`)
- **Medium**: 48px × 48px (`w-12 h-12`) - Default
- **Large**: 64px × 64px (`w-16 h-16`)

**Design Guidelines:**
- Logo should be **circular only** - no square, rectangular, or other shapes
- Should work well at all three size variants
- Must maintain readability at small sizes
- Should complement the purple/pink color scheme
- SVG format preferred for scalability, or high-quality PNG

**Implementation:**
- Logo component: `frontend/src/components/VKLogo.tsx`
- Alternative implementations available: `VKLogoSVG.tsx`, `VKLogoImage.tsx`
- Logo is used in:
  - Sidebar header (large)
  - Mobile header (medium)
  - Floating logo when sidebar collapsed (large)

**Updating the Logo:**
1. If using SVG: Update `VKLogoSVG.tsx` component
2. If using image: Place image in `frontend/public/` and update `VKLogoImage.tsx`
3. Ensure the logo maintains circular shape
4. Test at all three sizes (sm, md, lg)
5. Verify hover states work correctly
6. Ensure accessibility (good contrast, alt text if image-based)

## What Shows in Modals vs Pages

- Modals (quick preview):
  - First 8 tech items, first 3 highlights, first 1–2 images, truncated contribution.
  - No videos in modals.
- Detail pages:
  - Full tech stack, all highlights, full contribution, image carousel, videos, diagrams.

## Building and Deploying

1) Install deps (first time):
   ```bash
   cd frontend
   npm install
   ```
2) Build:
   ```bash
   npm run build
   ```
3) Deploy on Vercel (frontend root: `frontend/`, output: `dist/`).

## Troubleshooting

- Missing content? Ensure IDs are unique and required fields are present.
- Media 404? Confirm paths under `media/` match references in JSON/MD.
- Resume not updating? Bump `current_version` in `resume.json` and ensure filename exists.

## Future Dynamic Backend

- This static pipeline mirrors the future API schema. When moving to FastAPI hosting, you can serve the same shapes dynamically without changing the frontend.

## Dark / Light (Professional) Mode Content Notes

- **Same content in both modes**: Dark (cyberpunk) and light (professional) themes show the same content—no theme-based filtering of blog posts or sections. Keep a single source of truth in YAML/JSON.
- **Life is separate**: The Life section is a distinct "room" with its own theme and no theme toggle; see Life Section above and `docs/life-section-plan.md`.
- Document any bright-mode-specific assets in `docs/professional-version.md`.
