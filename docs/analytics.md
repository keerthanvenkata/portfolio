# Analytics (PostHog)

The frontend uses [PostHog](https://posthog.com) for product analytics: pageviews, optional session replay, feature flags, and custom events. Integration follows the official [PostHog React](https://posthog.com/docs/libraries/react) and [Vite env](https://vitejs.dev/guide/env-and-mode.html) docs.

## Setup

### 1. Get PostHog credentials

- Create a project at [PostHog Cloud](https://us.posthog.com) (or use self-hosted).
- In **Project Settings**, copy your **Project API Key** and note the **Host** (e.g. `https://us.i.posthog.com`).

### 2. Local development

In `frontend/`, create or edit `.env.local` (this file is gitignored):

```bash
# frontend/.env.local
VITE_PUBLIC_POSTHOG_TOKEN=phc_your_project_api_key_here
VITE_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

- Variable names **must** be prefixed with `VITE_` so Vite exposes them to the client.
- If `VITE_PUBLIC_POSTHOG_TOKEN` is missing or empty, PostHog is not initialized and the app runs without analytics (no errors).

### 3. Production (e.g. Vercel)

Set the same variables in your hosting provider:

- **Vercel**: Project → Settings → Environment Variables.
- Add `VITE_PUBLIC_POSTHOG_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` for the Production (and optionally Preview) environment.

Rebuild and deploy so the client bundle gets the correct values at build time.

## Implementation details

- **Libraries**: `posthog-js`, `@posthog/react`.
- **Initialization**: `frontend/src/main.tsx` initializes PostHog only when a non-empty token is present, then wraps the app with `PostHogProvider`.
- **Pageviews**: SPA route changes are tracked in `App.tsx` via `usePostHog` and `useLocation`; we send `$pageview` with `path` so each route is recorded (autocapture pageview is disabled to avoid duplicates).
- **Usage elsewhere**: Use the `usePostHog()` hook from `@posthog/react` for custom events, feature flags, or identify; guard with optional chaining (`posthog?.capture(...)`) because PostHog may be uninitialized when the token is not set.

## Privacy and compliance

- PostHog can be configured for session replay, masking, and data residency in your project settings.
- No analytics are sent when the token is not configured (e.g. local dev without `.env.local`).

## References

- [PostHog React library](https://posthog.com/docs/libraries/react)
- [Vite env variables](https://vitejs.dev/guide/env-and-mode.html) (use `VITE_PUBLIC_*` for client-side)
