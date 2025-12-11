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

> Bright/Professional mode will be handled entirely in the frontend via query params + local preference, so no additional env vars are needed.

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
- When bright mode ships, ensure `Vercel → Settings → Headers` allows `Preference-Applied` cookies if you choose to persist theme per visitor. For now, no server config change is required.

### Media and video posters
- Canonical content lives in `backend/app/content/` (Markdown, JSON, and media). The prebuild step copies media to `frontend/public/media` and emits JSON under `frontend/public/api`.
- Projects support optional video via two fields in `backend/app/content/projects.json`:
  - `video`: either a self-hosted path under `media` (e.g. `projects/my-project/demo.mp4`) or an external embed URL (e.g. Loom/YouTube iframe src).
  - `videoPoster`: an image shown in the modal as the representative preview (preferred if a video exists). If omitted, the first image in `images` is used.
- Modal behavior: the modal never embeds the video; it shows a single representative image (poster preferred). The full media gallery and the playable video are shown on the project detail page.
- External hosts (Loom/YouTube): the detail page uses an iframe; the platform shows its own preview inside the iframe. The modal still uses `videoPoster` (or falls back to the first screenshot) because we do not load the iframe in the modal.
- Self‑hosted video: generate a poster image and set `videoPoster`.
  - Windows ffmpeg example:
    ```powershell
    # Extract a frame at 2 seconds and scale to width 1280 (keeps aspect)
    ffmpeg -ss 00:00:02 -i "backend\app\content\media\projects\my-project\demo.mp4" `
           -vframes 1 -vf "scale=1280:-1" -q:v 2 `
           "backend\app\content\media\projects\my-project\video-poster.jpg"
    ```
  - Then set in `projects.json`:
    ```json
    {
      "video": "projects/my-project/demo.mp4",
      "videoPoster": "projects/my-project/video-poster.jpg"
    }
    ```


