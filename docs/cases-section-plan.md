# Cases Section — Plan

**Status**: Planning. Two cases initially (BookMyStall.in; Adaequare + Cotality with attribution). Content for Adaequare pending manager approval. Section should be future-proof as more cases are added.

---

## 1. Purpose

- **Cases** = client / company testimonials and impact stories (who you worked with, what they say, which project it ties to).
- Sits between **Projects** and **Experimental** in the nav (or as decided).
- Keeps the same theme as the rest of the site: dark, glass cards, violet/magenta/electric-pink accents, neon borders (see `docs/style-guide.md`).

---

## 2. Depth: Light Cases Page + Blog for Expansion

**Recommendation:**

- **Cases page**: One scrollable page with **cards only**. Each card shows a teaser: company/client, person, logo, short quote or one-line, and primary link. **Clicking a card opens a modal** (no separate page per case).
- **Modal** (on card click): Full quote, person + role, link(s), optional **“View project”** (→ project detail page), optional **“Read more”** (→ related blog posts). Same theme as the rest of the site (glass, violet/magenta, close button). Long-form expansion stays in the **blog** via `relatedPosts`.

**Why this works:**

- You only maintain one place for the full narrative (blog).
- Cases stay scannable and easy to add (new card = new case entry).
- Future-proof: new cases just get a card; if you write a post about a case, add it to `relatedPosts` and the card links to it.
- Adaequare case will include **Cotality as client with attribution** (work done at Adaequare for client Cotality — one big project, one medium project). Quote can be placeholder until manager approves; blog post + `relatedPosts` when ready.

---

## 3. Data Model (Future-Proof)

**Source**: `backend/app/content/cases.json` (array of case objects).

**Suggested shape:**

```json
{
  "id": "bookmystall",
  "company": "BookMyStall.in",
  "client": null,
  "person": {
    "name": "Founder Name",
    "role": "Founder",
    "company": "BookMyStall.in"
  },
  "logo": "cases/bookmystall.svg",
  "link": "https://linkedin.com/...",
  "quote": "Short testimonial or impact line.",
  "projectIds": ["event-flyer-extractor"],
  "relatedPosts": ["post-slug-1"]
}
```

Example with **client attribution** (Adaequare + Cotality):

```json
{
  "id": "adaequare-cotality",
  "company": "Adaequare",
  "client": "Cotality",
  "person": { "name": "Manager Name", "role": "Role", "company": "Adaequare" },
  "logo": "cases/adaequare.svg",
  "link": "https://adaequare.com",
  "quote": "TBC — pending approval.",
  "projectIds": ["contract-extraction", "tax-roll-pipeline"],
  "relatedPosts": []
}
```

- **id**: Unique slug (URL-safe).
- **company**: Display name (e.g. “BookMyStall.in”, “Adaequare”).
- **client**: Optional. When set (e.g. “Cotality”), show attribution like “Work at [company] for client [client]” so both employer and client are credited.
- **person**: name, role, optional company (for “Name, Role at Company”).
- **logo**: Path under `content/media/` or `frontend/public/media/cases/` (SVG preferred; same idea as About tech logos).
- **link**: Single URL (LinkedIn or company site); or add `links: [{ label, url }]` later if you want multiple.
- **quote**: Testimonial or short impact line. Can be one sentence; for Adaequare can be placeholder until approved.
- **projectIds**: Optional array; “View project” in the modal can list one or more related projects (e.g. one big + one medium for Adaequare/Cotality).
- **relatedPosts**: Optional array of blog post ids; “Read more” in the modal links to these. **This is where you expand** — write the full case story in a post and link it here.

Optional later:

- **impactBullets**: Short list of outcomes (e.g. “Reduced review time by 80%”) if you want them in the modal without a full post.
- **links**: Array of `{ label, url }` for multiple links (e.g. LinkedIn + company site).

---

## 4. UX Summary

| Element           | Location        | Behavior |
|------------------|-----------------|----------|
| Cases nav item   | Between Projects & Experimental (or as decided) | Route `/cases` |
| Cases page       | Single scrollable page | List of case cards |
| Card             | Teaser: company (and client if set), person, logo, short quote, link | **Click → open modal** (no separate page per case) |
| Modal            | Full quote, person, link(s), “View project” (one or more), “Read more” (blog) | Same theme (glass, violet/magenta); close to return to grid |
| Long-form story  | Blog            | Write once; link from case via `relatedPosts` (shown in modal) |

---

## 5. Implementation Checklist (When Ready)

- [ ] Add `backend/app/content/cases.json` with the above schema (BookMyStall + Adaequare placeholders).
- [ ] Add Cases to nav and route `/cases` in `frontend/src/App.tsx`.
- [ ] Add generator step in `frontend/scripts/generate-content.mjs`: read `cases.json`, optionally copy case logos to `frontend/public/media/cases/`, emit `frontend/public/api/cases.json`.
- [ ] Add `Case` type and `fetchCases()` in `frontend/src/lib/api.ts`.
- [ ] Build Cases page: same theme (glass, violet/magenta, borders), cards with logo, short quote, person, link. **Modal** on card click: full quote, person, link(s), “View project” (if `projectIds`), “Read more” (if `relatedPosts`). Reuse existing modal pattern (e.g. Experimental modal) for consistency.
- [ ] No case-detail route; modal only.

---

## 6. Open Points

- **Nav order**: Cases between Projects and Experimental, or after Projects before Experimental? (Current proposal: Projects → Cases → Experimental.)
- **Adaequare**: One case with **Cotality as client** (attribution: “Work at Adaequare for client Cotality”); one big + one medium project. Placeholder quote until manager approves; add blog post and `relatedPosts` when ready.
- **Logo assets**: Where to store (e.g. `backend/app/content/media/cases/` vs `frontend/public/media/cases/`); generator copies to public if needed.
