## Deploy to Vercel (Static Frontend)

This project now builds all content into static JSON under `frontend/public/` and serves via Vercel's Static Hosting. No server required.

### Prerequisites
- Node 18+ (Vercel uses Node 18/20 by default)
- Vercel account

### Build pipeline
- During `npm run build` in `frontend/`, a prebuild script runs:
  - Reads content from `backend/app/content/`
  - Emits JSON to `frontend/public/api/` and copies media to `frontend/public/media/`

### Local dev
1. In one terminal:
   - `cd frontend`
   - `npm i`
   - `npm run prebuild` (optional; dev can fetch from generated files if present)
   - `npm run dev`
2. Visit `http://localhost:5173`

### Deploy via Vercel UI
1. Push repo to GitHub/GitLab/Bitbucket
2. In Vercel Dashboard → New Project → Import your repo
3. Framework Preset: `Vite`
4. Root directory: `frontend`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Environment Variables: none required
8. Deploy

### Deploy via CLI
```
npm i -g vercel
cd frontend
vercel --prod
```

### Notes
- Static API endpoints:
  - `/api/posts.json`, `/api/posts/{id}.json`
  - `/api/projects.json`, `/api/projects/{id}.json`
  - `/media/*` for images/videos
- To update content, edit files in `backend/app/content/` and redeploy.


