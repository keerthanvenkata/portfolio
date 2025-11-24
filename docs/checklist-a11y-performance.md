# Accessibility & Performance Checklist

## How to Run

1. Open the deployed site in Chrome.
2. Open DevTools → Lighthouse → select Mobile & Desktop.
3. Categories: Performance, Accessibility, Best Practices, SEO.
4. Generate report.

Alternatively, use PageSpeed Insights.

## What We Implemented

- Skip link to main content (index.html)
- Focus-visible outlines and reduced-motion CSS (src/styles.css)
- Semantic landmarks: nav, main, aria-labels
- Modal a11y: role="dialog", aria-modal, focus trap, Esc close
- Buttons/links: aria-labels for icon-only controls (VideoPlayer, social links, mobile menu)
- Lazy routes + on-hover prefetch + idle prefetch
- Lazy images (loading="lazy", decoding="async")
- Skeleton loading states on lists
- Theme-ready tokens: global CSS variables scoped to `body[data-theme="dark"]` (light tokens TBD, see professional version doc)

## What To Watch For

- Contrast: verify text/background contrast meets WCAG AA
- When bright/professional mode ships, re-run contrast + prefers-color-scheme tests
- Image dimensions: add width/height if CLS is flagged
- Large assets: compress images/videos (WebP/MP4 H.264)
- Unused JS: run bundle analysis if performance score dips
- Theme toggle: keyboard focusable, ARIA-pressed set, respects reduced-motion

## Quick Fix Steps

- If CLS flagged → add intrinsic sizes or fixed aspect containers
- If Performance low on mobile → consider reducing initial animations and splitting vendor chunks
- If a11y names missing → add aria-label or visible text to interactive elements
