# Media Directory Structure

This directory contains all media files for the portfolio website. The build process copies these files to the frontend's public directory.

## Directory Structure

```
media/
├── projects/           # Project-specific media
│   ├── {project-id}/  # Individual project folders
│   │   ├── screenshots/
│   │   ├── diagrams/
│   │   └── videos/
├── blog/              # Blog post media
│   ├── {post-id}/     # Individual post folders
│   └── featured/      # Featured images
├── portrait/          # Hero section portrait images
│   ├── 3.jpeg         # Full body portrait
│   ├── 5.jpeg         # Half body portrait
│   └── 13.jpeg        # Portrait to thighs
├── screenshots/       # General screenshots
├── diagrams/          # Architecture diagrams, flowcharts
└── videos/           # Demo videos, presentations
```

## Usage Guidelines

### Project Media
- Place project-specific images in `projects/{project-id}/`
- Use descriptive filenames: `architecture-diagram.png`, `demo-screenshot-1.jpg`
- Supported formats: JPG, PNG, GIF, WebP for images; MP4, WebM for videos

### Blog Media
- Place blog images in `blog/{post-id}/`
- Featured images can go in `blog/featured/`
- Use descriptive filenames: `hero-image.jpg`, `code-snippet.png`

### Portrait Images
- Place hero section portrait images in `portrait/`
- Supported formats: JPG, PNG, WebP
- Recommended: Transparent background (PNG) or images with transparent backgrounds
- Current images:
  - `3.jpeg` - Full body portrait
  - `5.jpeg` - Half body portrait  
  - `13.jpeg` - Portrait to thighs
- To change the displayed portrait, update `PORTRAIT_IMAGE` constant in `frontend/src/App.tsx` (HomePage component)
- Images are hidden on mobile devices, visible on desktop (lg breakpoint and above)

### General Media
- Screenshots: `screenshots/` for general portfolio screenshots
- Diagrams: `diagrams/` for architecture diagrams, flowcharts
- Videos: `videos/` for demo videos, presentations

## File Naming Conventions

- Use kebab-case: `my-awesome-screenshot.png`
- Include project/post ID when relevant: `qfi-capital-architecture.png`
- Use descriptive names: `user-dashboard-mobile.png` not `img1.png`

## Referencing in Content

In your JSON files and markdown, reference media like this:

```json
{
  "images": [
    "projects/qfi-capital/screenshots/dashboard.png",
    "projects/qfi-capital/diagrams/architecture.png"
  ],
  "video": "projects/qfi-capital/videos/demo.mp4",
  "videoPoster": "projects/qfi-capital/screenshots/video-thumbnail.jpg"
}
```

## Build Process

The `generate-content.mjs` script automatically:
1. Copies all media files to `frontend/public/media/`
2. Preserves the directory structure
3. Makes files available at `/media/{path}` in the built site

## Optimization Tips

- Compress images before adding them
- Use WebP format for better compression
- Keep video files under 10MB when possible
- Use appropriate dimensions (max 1920px width for screenshots)
