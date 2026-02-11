# Life Section — Plan & UX

**Status**: Planning. The **Life** section will be implemented as described here. **Exact style and section list are still TBD**; this doc captures the best direction so far and open questions for discussion.

## 1. Purpose

- **Life** = one top-level nav entry and a single route (`/life`) that feels like a separate "room" — personal, creative, and visually distinct from the professional/dev side.
- **Rest of site** = professional identity (Projects, Blog, About, Resume). Dark and light modes show the same content; only the skin (cyberpunk vs parchment) changes.
- **Life** = personal atmosphere. No theme toggle on this page; Life has its own theme so it feels like "you left the workspace… welcome to the living space."

## 2. Structure (Sections TBD)

- **One route**: `/life` (no `/life/music`, `/life/travel` as separate nav items). In-page sections with anchor IDs and smooth scroll; **section list not final** — may have more (or fewer) than below.
- **Candidate sections** (to be confirmed or expanded):
  - **Music** — Playlists, "currently looping," **Spotify integration** (see § Spotify below).
  - **Travel** — Photo grid, short captions or mini stories; can expand to blog-style travel posts later.
  - **Food** — Dish photos, optional expandable recipe cards, "experiments."
  - **Thoughts** — Short essays or reflections; "notes from being human," not the formal main blog.
  - *(Others TBD.)*

**UX pattern**: Sticky mini-nav inside the Life page for jumping between sections (e.g. "Music · Travel · Food · Thoughts" or whatever is finalized). Each section visually distinct (icon, tint, or divider) but part of the same page.

## 3. Spotify Integration (To Discuss)

- **Goal**: Integrate Spotify playlists in Life (likely in the Music section). Exact UX to be decided; options to consider:
  - **Collapsible**: List or grid of playlists that expand/collapse to show embed or details.
  - **Embedded mini-player**: One compact player (e.g. sticky or in-section) that can switch context when a playlist is chosen.
  - **Tiles → player**: Tiles/cards for each playlist; click scrolls to or opens a dedicated "player" area (same page) where the Spotify embed loads for that playlist.
  - **Other**: e.g. simple embed cards per playlist, or link-out to Spotify with preview art only.
- **Technical**: Spotify Embed (iframe) or Spotify Web API; playlist IDs in content (e.g. `life.json` or music subsection). Discuss embedding rules, sizing, and mobile behavior in detail when implementing.

## 4. Theme: Life as Its Own Atmosphere (Style TBD)

- **Exact style not decided yet.** Current best direction: a distinct atmosphere (e.g. Golden Hour, film nostalgia, or soft nature minimal) that contrasts with dev cyberpunk/parchment while still feeling like the same site.
- **Consistent with the rest of the site** (so it doesn’t feel like a different website):
  - Same typography family (or close sibling).
  - Same layout system (spacing, grid, card shapes).
  - Same motion style (hover, transitions).
  - Same icon style.

- **Different to signal "you’re somewhere else"** (candidates; to be pinned down):
  - Background texture or gradient (e.g. warm, cinematic).
  - Accent color palette (e.g. Golden Hour: burnt orange, deep navy, warm off-white; or film nostalgia: muted terracotta, dusty blue, warm beige).
  - Softer lighting/shadows; more organic shapes where appropriate.

**Implementation approach** (when style is decided): Use a section attribute so Life gets its own design tokens, e.g.:

- When route is `/life`, set `body[data-section="life"]` (or wrap content in a layout with `data-section="life"`).
- In CSS (or Tailwind/theme), define Life-specific tokens: `--bg`, `--accent`, `--card`, `--text`, etc.
- Dev pages keep `data-theme="cyber"` or `data-theme="papyrus"`; Life overrides with its own token set. No theme toggle UI on the Life page.

## 5. What to Avoid

- Totally different fonts or layout structure.
- Different button/control styles that break the design system.
- Making Life feel like an external blog or a different product.
- Showing the global dark/light toggle on the Life page.

Goal: same person, different mood.

## 6. Content & Data

- Content source TBD: e.g. `backend/app/content/life.json` (or one file per section) with subsections for Music, Travel, Food, Thoughts.
- Media: e.g. `backend/app/content/media/life/` (or `media/life/{section-id}/`) for images, playlists, etc. Generator copies to `frontend/public/media/` as for other content.
- Blog-for-life style posts live inside Life (e.g. Thoughts), not as theme-filtered posts in the main blog.

## 7. Nav & Routing

- Main nav: **Life** is one item; no sub-items for Music/Travel/Food/Thoughts in the main sidebar. Old URL `/outside` redirects to `/life`.
- URL: `/life` for the hub; optional deep links `/life#music`, `/life#travel`, etc. for sharing.

## 8. References

- Product story and IA: `docs/master-plan.md`
- Content workflow: `docs/howto-add-content.md` (Life Section)
- Visual system: `docs/style-guide.md` (Life theme to be added when implemented)
- Professional/bright mode: `docs/professional-version.md`

---

**Last updated**: 2026-02
