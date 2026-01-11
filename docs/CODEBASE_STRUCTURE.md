# Codebase Structure & Patterns Guide

This document provides a comprehensive overview of the portfolio codebase structure, patterns, and how to update content.

## 📁 Architecture Overview

### Content-First Design
- **Source of Truth**: All content lives in `backend/app/content/`
- **Build Process**: Content is transformed into static JSON during `npm run build`
- **Frontend Consumption**: React app reads from static JSON files in `frontend/public/api/`
- **Future-Ready**: FastAPI backend mirrors the same structure for easy migration

---

## 🗂️ Directory Structure

```
portfolio/
├── backend/
│   └── app/
│       ├── content/              # ⭐ SOURCE OF TRUTH
│       │   ├── posts/            # Blog markdown files
│       │   ├── projects.json     # Professional projects
│       │   ├── experimental.json # Hobby/experimental projects
│       │   ├── timeline.json     # Career/education timeline
│       │   ├── social.json       # Social links config
│       │   ├── resume/           # Resume PDFs + metadata
│       │   └── media/            # Images, videos, diagrams
│       ├── models.py             # Pydantic models (FastAPI)
│       ├── services/
│       │   └── content_loader.py # Content loading logic
│       └── routers/              # FastAPI endpoints
│           ├── blog.py
│           └── projects.py
│
└── frontend/
    ├── public/
    │   └── api/                  # ⭐ GENERATED STATIC JSON
    │       ├── posts.json
    │       ├── posts/
    │       ├── projects.json
    │       ├── projects/
    │       ├── timeline.json
    │       └── social.json
    ├── scripts/
    │   └── generate-content.mjs  # ⭐ CONTENT GENERATOR
    └── src/
        ├── lib/
        │   └── api.ts            # API client (reads static JSON)
        ├── components/          # Reusable components
        └── pages/               # Route pages
```

---

## 🔄 Content Generation Flow

### Build Process (`npm run build`)

1. **Prebuild Hook**: `prebuild` script runs `generate-content.mjs`
2. **Content Processing**:
   - Blog posts: Markdown → HTML → JSON
   - Projects: JSON → Combined + Individual files
   - Timeline: JSON → Copied as-is
   - Resume: PDFs copied + `resume-latest.pdf` created
   - Media: Directory copied recursively
3. **Output**: All files written to `frontend/public/api/` and `frontend/public/media/`
4. **Vite Build**: Frontend bundled with static assets

### Generator Script (`generate-content.mjs`)

**Key Functions:**
- `generatePosts()`: Parses markdown with frontmatter, converts to HTML
- `generateProjects()`: Combines `projects.json` + `experimental.json`
- `generateResume()`: Copies PDFs and creates latest symlink
- `generateTimeline()`: Copies timeline JSON
- `generateSocial()`: Copies social config

**Pattern**: Each generator reads from `backend/app/content/` and writes to `frontend/public/api/`

---

## 📝 Content File Formats

### 1. Blog Posts (`backend/app/content/posts/*.md`)

**Format**: Markdown with YAML frontmatter

```markdown
---
id: startup-journey
category: Entrepreneurship
title: Building a Startup While Working
excerpt: Reflections on co-founding QFI Capital...
date: 2024-12-10
featured: true
---

Content in markdown format...
```

**Required Fields:**
- `id`: Unique identifier (used in URL)
- `title`: Post title
- `excerpt`: Short description
- `category`: One of: Tech, Career, Entrepreneurship, Tutorial
- `date`: YYYY-MM-DD format
- `featured`: Boolean (optional, defaults to false)

**Generated Output:**
- `/api/posts.json`: Array of all posts
- `/api/posts/{id}.json`: Individual post with `content_html`

---

### 2. Projects (`backend/app/content/projects.json`)

**Format**: JSON array

```json
[
  {
    "id": "qfi-capital",
    "title": "QFI Research Capital",
    "role": "Founding Engineer & Consultant",
    "description": "Algorithmic trading platform...",
    "contribution": "Architected and led...",
    "contributionBullets": [
      "Designed the event-driven architecture...",
      "Implemented real-time WebSocket ingestion..."
    ],
    "tech": ["Python", "C++", "PostgreSQL", "Kafka"],
    "link": "https://qficapital.in",
    "embedSite": "https://qficapital.in",
    "status": "Live",
    "images": ["projects/qfi/qfi.png"],
    "video": null,
    "videoPoster": null,
    "highlights": [
      "Mid-frequency algorithmic trading...",
      "Sub-second Kafka streaming pipelines..."
    ],
    "relatedProjects": ["trading-and-backtesting-bot"],
    "relatedPosts": ["startup-journey"],
    "featured": true,
    "kind": "project"
  }
]
```

**Required Fields:**
- `id`: Unique identifier
- `title`: Project name
- `description`: Overview
- `tech`: Array of technologies
- `kind`: `"project"` (for professional projects)

**Optional Fields:**
- `role`: Your role in the project
- `contribution`: Text description OR `contributionBullets`: Array of bullet points
- `link`: External URL
- `embedSite`: URL for iframe embedding
- `status`: Status badge (e.g., "Live", "Production")
- `images`: Array of paths relative to `/media/`
- `video`: Video URL (supports Loom embeds or local paths)
- `videoPoster`: Thumbnail image for video
- `highlights`: Array of key achievements
- `relatedProjects`: Array of project IDs
- `relatedPosts`: Array of blog post IDs
- `featured`: Boolean

**Generated Output:**
- `/api/projects.json`: Combined array (projects + experimental)
- `/api/projects/{id}.json`: Individual project

---

### 3. Experimental Projects (`backend/app/content/experimental.json`)

**Format**: Same as projects, but `kind: "experimental"`

**Key Differences:**
- Automatically gets `kind: "experimental"` if not specified
- Shown in `/experimental` route
- Uses `ExperimentalModal` and `ExperimentalDetail` components
- Can have simpler structure (fewer required fields)

**Example:**
```json
[
  {
    "id": "trading-and-backtesting-bot",
    "title": "Trading and Backtesting Bot",
    "description": "Algorithmic trading bot with backtesting capabilities...",
    "tech": ["Python", "PostgreSQL", "InfluxDB", "Docker", "Kafka", "Kite Connect"],
    "details": "Trading bot with real-time data processing...",
    "highlights": ["Real-time market data processing", "Backtesting framework"],
    "images": [],
    "featured": false,
    "kind": "experimental"
  }
]
```

---

### 4. Timeline (`backend/app/content/timeline.json`)

**Format**: JSON array of career/education items

```json
[
  {
    "id": "exp-adaequare-sde-ai",
    "type": "experience",
    "title": "SDE Applied AI",
    "organization": "Adaequare",
    "location": "Hyderabad, IN",
    "start": "2025-03-01",
    "end": null,
    "highlights": [
      "Built backend and app for OCR + NLP/LLM pipeline...",
      "Designed two-layer matching/ETL..."
    ]
  },
  {
    "id": "edu-btech",
    "type": "education",
    "title": "B.Tech, Aerospace Engineering",
    "organization": "Indian Institute of Technology, Madras (IITM)",
    "location": "Chennai, IN",
    "start": "2020-07-01",
    "end": "2025-05-31",
    "highlights": [
      "Specialized in autonomous systems...",
      "Worked on UAV path planning..."
    ]
  }
]
```

**Required Fields:**
- `id`: Unique identifier
- `type`: `"experience"` or `"education"`
- `title`: Job title or degree
- `organization`: Company or institution
- `start`: YYYY-MM-DD format
- `end`: YYYY-MM-DD or `null` for ongoing

**Optional Fields:**
- `location`: Location string
- `highlights`: Array of achievement bullets

**Display:**
- Rendered in `About.tsx` via `Timeline` component
- Sorted by end date (ongoing first), then start date (descending)

---

### 5. Resume (`backend/app/content/resume/`)

**Structure:**
```
resume/
├── resume.json          # Metadata
├── resume-v1.pdf
├── resume-v2.pdf
└── resume-v3.1.pdf
```

**resume.json Format:**
```json
{
  "current_version": "v3.1",
  "versions": [
    {
      "version": "v3.1",
      "filename": "resume-v3.1.pdf",
      "date": "2025-12-11",
      "description": "Minor corrections; version 3.1",
      "is_latest": true
    }
  ],
  "metadata": {
    "last_updated": "2025-12-11",
    "total_versions": 3
  }
}
```

**Generated Output:**
- All PDFs copied to `frontend/public/resume/`
- `resume-latest.pdf` created from `current_version`
- `resume.json` copied to output directory

**To Update Resume:**
1. Add new PDF: `resume-v4.pdf` to `backend/app/content/resume/`
2. Update `resume.json`:
   - Set `current_version: "v4"`
   - Add version entry with `is_latest: true`
   - Update `metadata.last_updated`
3. Run build: `cd frontend && npm run build`

---

### 6. Social Config (`backend/app/content/social.json`)

```json
{
  "github_username": "keerthanvenkata",
  "linkedin_url": "https://www.linkedin.com/in/venkata-keerthan/",
  "github_url": "https://github.com/keerthanvenkata",
  "email": "keerthanvenkata@gmail.com",
  "website": "https://keerthan.dev"
}
```

**Usage**: Currently used for reference; social links are hardcoded in `App.tsx` sidebar.

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.tsx
├── Sidebar (Navigation)
├── Routes
│   ├── HomePage
│   ├── ProjectsPage
│   │   └── ProjectModal (Quick Preview)
│   ├── ProjectDetail (Full Page)
│   ├── ExperimentalDetail
│   ├── BlogPage
│   │   └── BlogModal (Quick Preview)
│   ├── BlogDetail
│   ├── AboutPage
│   │   └── Timeline
│   ├── ResumePage
│   │   └── PDFViewer
│   └── ContactPage
└── Footer
```

### Data Flow

1. **API Client** (`lib/api.ts`):
   - Uses axios with base URL from `VITE_API_BASE` env var
   - Defaults to empty string (static files)
   - Functions: `fetchPosts()`, `fetchProjects()`, `fetchTimeline()`, etc.

2. **Component Data Fetching**:
   - Components use `useEffect` to fetch data on mount
   - Loading states handled with skeletons/spinners
   - Error states with fallback UI

3. **Modal vs Detail Pages**:
   - **Modals**: Quick preview (3 highlights, 1 image, truncated text)
   - **Detail Pages**: Full content (all highlights, tech stack, media carousel, videos)

---

## 🔧 FastAPI Backend (Future-Ready)

### Current Status
- **Not Deployed**: Backend is skeleton only
- **Purpose**: Ready for future dynamic API migration
- **Structure**: Mirrors static JSON structure

### Models (`models.py`)
- `BlogPost`: Pydantic model matching frontend type
- `Project`: Pydantic model with validation

### Services (`services/content_loader.py`)
- `load_posts()`: Reads markdown files, parses frontmatter
- `load_projects()`: Reads JSON files, combines projects + experimental
- Same logic as Node.js generator, but for runtime API

### Routers
- `/api/blog/posts`: List/filter posts
- `/api/blog/posts/{id}`: Get single post
- `/api/projects/`: List/filter projects
- `/api/projects/{id}`: Get single project

**Migration Path**: When ready, set `VITE_API_BASE` to backend URL, and frontend will switch from static files to API calls.

---

## 📋 Update Workflow

### Adding/Updating Content

1. **Edit Source Files**:
   - Blog: Edit `backend/app/content/posts/*.md`
   - Projects: Edit `backend/app/content/projects.json`
   - Experimental: Edit `backend/app/content/experimental.json`
   - Timeline: Edit `backend/app/content/timeline.json`
   - Resume: Add PDF + update `resume.json`

2. **Regenerate Static Files**:
   ```bash
   cd frontend
   npm run prebuild  # Just generate content
   # OR
   npm run build     # Full build (includes prebuild)
   ```

3. **Test Locally**:
   ```bash
   npm run dev       # Dev server with hot reload
   ```

4. **Deploy**:
   - Push to Git
   - Vercel auto-deploys on push
   - Or manually trigger deployment

### Media Files

**Structure:**
```
backend/app/content/media/
├── projects/
│   ├── qfi/
│   │   └── qfi.png
│   └── property-appraisal/
│       ├── arch.jpg
│       └── ss.jpg
├── blog/
├── diagrams/
├── screenshots/
└── videos/
```

**Usage in Content:**
- Reference in JSON: `"images": ["projects/qfi/qfi.png"]`
- Frontend serves from: `/media/projects/qfi/qfi.png`
- Generator copies entire `media/` directory to `frontend/public/media/`

---

## 🎯 Key Patterns

### 1. Content-First Architecture
- Source of truth in `backend/app/content/`
- Build-time generation to static files
- Frontend consumes static JSON (no runtime processing)

### 2. Type Safety
- Pydantic models in backend
- TypeScript types in frontend (`lib/api.ts`)
- Shared structure between backend and frontend

### 3. Modal vs Detail Pattern
- Modals: Quick preview, limited content
- Detail Pages: Full content, all media, related items
- Smooth transition between modal → detail page

### 4. Related Content
- Projects can link to related projects/posts via IDs
- Frontend resolves IDs to full objects
- Fallback to similarity-based matching if no explicit links

### 5. Media Handling
- Images: Carousel component with lazy loading
- Videos: Supports Loom embeds (iframe) or local files (video player)
- Posters: Thumbnail images for videos

### 6. Responsive Design
- Mobile: Full-screen sidebar menu
- Desktop: Hover-based collapsible sidebar
- Consistent glass-morphism UI throughout

---

## 🚀 Quick Reference

### Update Projects
```bash
# Edit: backend/app/content/projects.json
# Add/update project objects
# Run: cd frontend && npm run build
```

### Update Timeline
```bash
# Edit: backend/app/content/timeline.json
# Add/update timeline items
# Run: cd frontend && npm run build
```

### Add Blog Post
```bash
# Create: backend/app/content/posts/my-post.md
# Add frontmatter + markdown content
# Run: cd frontend && npm run build
```

### Update Resume
```bash
# Add PDF: backend/app/content/resume/resume-v4.pdf
# Edit: backend/app/content/resume/resume.json
# Set current_version and add version entry
# Run: cd frontend && npm run build
```

### Add Experimental Project
```bash
# Edit: backend/app/content/experimental.json
# Add project object with kind: "experimental"
# Run: cd frontend && npm run build
```

---

## 📚 Related Documentation

- `docs/howto-add-content.md`: Step-by-step content addition guide
- `docs/architecture-and-performance.md`: Performance optimizations
- `docs/vercel-deploy.md`: Deployment guide
- `docs/style-guide.md`: Design system and styling

---

**Last Updated**: 2025-01-28
**Maintained By**: Venkata Keerthan Nimmala

