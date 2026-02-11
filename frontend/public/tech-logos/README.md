# Tech stack logos

Place SVG (or PNG) logo files here and reference them in `src/pages/About.tsx` as `/tech-logos/filename.svg`.

## Getting consistent, same-size logos

All of these give you **24×24 or similar SVG icons** in a uniform style so they look consistent:

1. **Simple Icons** (recommended)  
   - https://simpleicons.org  
   - Search for the tech (e.g. "Python", "Docker", "FastAPI").  
   - Click the icon → "Download SVG".  
   - Save into this folder with a clear name (e.g. `python.svg`, `docker.svg`).  
   - Naming: use the slug from the URL (e.g. `fastapi.svg`, `langchain.svg` for LangGraph if no LangGraph icon).

2. **Skill Icons**  
   - https://skillicons.dev  
   - Same idea: consistent style. You can use their CDN URLs or download and put SVGs here.

3. **Devicon**  
   - https://devicon.dev  
   - Large set; pick one style (e.g. "plain" or "original") and stick to it for all icons.

In `About.tsx`, set `logo` for each item, e.g.:

```ts
{ name: 'Python', logo: '/tech-logos/python.svg' },
```

The page already constrains size with `h-8 w-8` and `object-contain`, so 24×24 SVGs will scale cleanly.
