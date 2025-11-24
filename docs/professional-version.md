# Professional (Bright) Version Spec

Intent: “Artisanal Professionalism” — a warm parchment experience with modern precision. Dark neon remains the lab/default; bright mode becomes the recruiter/VC-facing skin, accessible via toggle and URL param without duplicating content.

## 1. Goals

- **Perception**: Warm, confident, handcrafted yet clearly technical.
- **Continuity**: Same routes, copy, IA. Only tokens, typography, and motion shift.
- **Access**:
  - Toggle in header/sidebar with playful micro-interaction.
  - URL param `?theme=bright` (or hash) for resume links.
  - Persist preference per device (localStorage + optional cookie).
- **Brand Voice**: Keep the friendly tone; just change the presentation layer.

## 2. Visual System

| Token | Dark (Current) | Bright (Planned) |
| --- | --- | --- |
| Background | #000000 + animated gradients | #F5F3EF parchment base (1–2% texture) |
| Cards | Glass morphism (`bg-black/40`) | #FCFBF8 primary surfaces, #E8E0D6 secondary panels |
| Text | #FFFFFF / #D1D5DB | #2C2416 primary, #5C4E3E secondary |
| Accents | Violet/Magenta/Electric Pink | #D4A574 (amber) CTAs, #8B7355 bronze, #B8860B limited highlight gold |
| Borders | Neon gradients | Hairline charcoal (#BDB4A8) or muted silver (#C8C5C0) |
| Effects | Glows, neon shadows | Soft elevation, ink-drawn underlines, gentle spotlight/grain, occasional gold dust |

Portrait & imagery:
- Bright-mode portrait can reuse existing PNG but prefer a parchment-friendly variant (less neon). Add soft cream halo `rgba(245,165,116,0.25)` and optional metallic edge.
- Maintain ability to swap via `PORTRAIT_IMAGE` when theme toggles.

## 3. Typography

- **Hero Display**: Averia Serif Libre (primary). Fallbacks: Playfair Display, Cormorant Garamond.
- **Section Headings**: Lora (600). Fallbacks: Playfair Display, EB Garamond.
- **Body Copy**: Open Sans (400/500). Fallback: Inter.
- **Mono accents**: JetBrains Mono or Recursive Mono for inline code/tech snippets.
- Rule: Serifs limited to hero + major headers; sans-serif for nav, body, buttons to retain modern clarity.

## 4. Layout & Interaction

- **Structure**: Layout remains identical (sidebar, hero, cards, modals). Spacing stays consistent between themes to avoid regressions.
- **Sidebar**: Same hover/pin logic. Visual treatment = matte parchment panel with subtle inner shadow + metallic dividers. Expansion uses parallax so background texture moves slower than content.
- **Buttons**: Solid amber/bronze fills or outlined styles with “ink fill” hover animation. Micro elevation (`translateY(-2px)`) + soft shadow deepen; zero glow.
- **Modals**: Raised cards (12px radius, 2px charcoal border @ ~8% opacity) with drop-in animation (scale 0.98→1, y 12px→0, shadow bloom). Overlay `rgba(44,36,22,0.55)` with gentle vignette.
- **Background**: Ultra-light parchment grain plus slow-moving spotlight. Sparse gold dust/sand particles around hero CTA for a living feel (extremely subtle).
- **Hero Imagery**: Optionally introduce a new portrait illustration tailored to the parchment aesthetic while keeping transparent background.
- **Toggle**: Slider with iconography (spark ↔ sunburst). Keyboard accessible, `aria-pressed`, respects reduced-motion.

## 5. Animation Philosophy

- **Hero Name**: Typewriter reveal (Averia Serif Libre). Each character fades in with ~40ms stagger; after completion, a thin amber line “writes” underneath. Optional soft “ink bloom” per letter.
- **Cards/Sections**: Rise 12px with ~220ms ease (`cubic-bezier(0.4,0,0.2,1)`), opacity 0→1, slight shadow deepen. Stagger 40ms within section.
- **Buttons/Links**: Ink fill or underline drawing on hover, plus micro elevation.
- **Sidebar**: Parallax slide-in; texture drifts slower than content.
- **Modals**: Drop + shadow bloom; overlay fade. Reverse motion on close.
- **Background Motion**: Very slow light sweep + occasional gold dust sparkle (like sand catching light). Keep subtle to avoid distraction.

## 6. Implementation Plan

1. **Token Layer**
   - Add `data-theme` on `<body>`.
   - Define CSS variables for colors/shadows per theme.
   - Update Tailwind config to consume CSS vars (e.g., `--color-surface`, `--color-accent`).
2. **State Management**
   - `useTheme()` hook: read param → localStorage → default dark.
   - Setter updates `data-theme`, persists, syncs toggle UI.
3. **Routing & Sharing**
   - Parse `?theme=bright|dark`. Override storage if param present.
   - Helper `createThemeLink(path, theme)` for resume links.
4. **Testing**
   - Paper-based execution for toggle, hero animation, sidebar hover/pin, modals.
   - Lighthouse/contrast checks for bright palette.
   - Visual regression checklist (hero, cards, modals, portrait swap, mobile nav).

## 7. Documentation & Assets

- Keep `README.md`, `docs/style-guide.md`, and this file aligned with design decisions.
- Capture before/after screenshots once bright mode launches.
- Track implementation tasks (starfield, logo redesign, portrait variants, toggle) in `docs/TODOS.md`.

## 8. Open Questions

- Logo/portrait: ship dedicated bright-mode assets or recolor existing ones?
- Optional “presentation” landing auto-opening bright mode for recruiters?
- Analytics: do we log theme preference/toggle usage?

Document answers before implementation to keep alignment tight.

