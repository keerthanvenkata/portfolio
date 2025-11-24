# Professional (Bright) Version Spec

Intent: offer a recruiter/VC-ready skin without changing content or tone. Dark neon mode stays default; bright mode is opt-in via toggle + URL parameter that can be shared on resumes.

## 1. Goals

- **Perception**: Clean, confident, still personal. Think refined product brochure rather than neon lab.
- **Continuity**: Same routes, same copy, same interactions. Only tokens, illustrations, and micro-accents shift.
- **Access**:
  - UI toggle (probably in header or sidebar) with playful micro-interaction.
  - URL parameter `?theme=bright` (or `/bright` hash) to deep link from resumes.
  - Persist preference per device (localStorage + optional cookie).
- **Brand Voice**: Keep informal tone—just swap the presentation.

## 2. Visual System

| Token | Dark (Current) | Bright (Planned) |
| --- | --- | --- |
| Background | #000000 w/ animated gradients | #F5F3EF base, #FFFFFF cards, #E7E1D9 accents |
| Text | #FFFFFF / #D1D5DB | #1F1B16 primary, #4C443A secondary |
| Accents | Violet #7F00FF, Magenta #FF00FF, Electric Pink #FF0080 | Violet used for buttons/links; add Muted Amber #F5A524 for highlights |
| Borders | Neon gradients + transparent black | Hairline charcoal (#BDB4A8) + subtle inset shadows |
| Effects | Drop-shadows, glassmorphism, animated glows | Soft elevation, emboss/deboss, gentle radial spotlight |

Portrait & imagery:
- Keep transparent PNGs; introduce a soft cream halo (`rgba(245, 165, 36, 0.25)`) in bright mode.
- Optional: provide alternate PNG exports with toned-down neon if needed.

## 3. Layout & Interaction

- **Structure**: Identical layout—sidebar, hero, cards, modals. No content jumps.
- **Sidebar**: Same hover/pin mechanics. Replace frosted-glass look with matte panel + subtle inner shadow.
- **Buttons**: Gradient fill replaced with solid violet/amber fills + thin outlines. Hover = shadow lift instead of glow.
- **Modals**: White card surface, drop-in animation with slight bounce, tinted overlay `rgba(12, 8, 4, 0.65)`.
- **Background**: Replace animated neon gradients with ultra-light grain or very faint diagonal spotlight. Optional tiny twinkles to echo the dark-mode stars.
- **Toggle Micro-Interaction**: Consider slider that travels between “Neon” and “Bright” icons (e.g., spark vs sunburst). Must be keyboard accessible and announce state via aria-pressed.

## 4. Implementation Plan

1. **Token Layer**
   - Introduce `data-theme` attribute on `<body>`.
   - Define CSS variables for colors, shadows, opacities (dark + bright variants).
   - Update Tailwind config to read CSS variables where needed.
2. **State Management**
   - `useTheme()` hook to read param, localStorage, prefers-color-scheme fallback.
   - Sync toggle UI, respect sequential task workflow (one feature at a time).
3. **Routing & Sharing**
   - Detect `?theme=bright` (and future `dark`) → apply theme + store preference, but do not break SSR/static export.
   - Provide helper `createThemeLink(path, theme)` for CTAs (resume, email signatures).
4. **Testing**
   - Paper-based simulation for both themes (hover, sidebar pin, modals).
   - Lighthouse contrast audits for bright palette.
   - Visual regression checklist: hero, cards, modals, mobile nav.

## 5. Documentation & Assets

- Update `README.md`, `docs/style-guide.md`, and this file whenever tokens or interactions change.
- Add before/after screenshots once bright mode ships.
- Track outstanding tasks in `docs/TODOS.md` under “Site Experience”.

## 6. Open Questions

- Should we ship alternate logos (e.g., darker outline) for bright mode?
- Do we want optional “presentation” landing that auto-opens bright mode + scrolls to career highlights?
- Any analytics required to know which theme link gets more engagement?

Document answers here before implementation to keep alignment tight.

