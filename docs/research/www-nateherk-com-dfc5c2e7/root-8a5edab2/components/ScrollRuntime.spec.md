# ScrollRuntime Specification

## Overview
- **Target file:** `<page>/ScrollRuntime.tsx`
- **Screenshot:** N/A — renders nothing.
- **Interaction model:** static (a mount-time side effect)

The only client component on the page. It boots the three ported runtime
modules once the real DOM exists, then returns `null`. Everything else in the
clone is a server component.

## DOM Structure
None. `return null`.

## Computed Styles
N/A.

## States & Behaviors

### Boot sequence
- **Trigger:** `useEffect(..., [])` after hydration.
- **Behaviour:** three sequential dynamic `import()`s, awaited in order —
  1. `@/lib/sites/.../glass.js` → installs `window.NHGlass`
  2. `@/lib/sites/.../scrollcraft.js` → installs `window.ScrollCraft`
  3. `@/lib/sites/.../home-runtime.js` → `mountHome()`
- **Why not `<Script>`:** the first two are IIFEs that read `window` as they
  evaluate, so they throw during SSR; and `mountHome()` requires both globals to
  already be installed. `<Script>` gives no ordering guarantee inside one
  strategy group. Awaiting the imports does.
- **Cleanup:** a `cancelled` flag stops `mountHome()` from running if the effect
  is torn down mid-import. There is no teardown for the engine itself —
  `ScrollCraft.mount()` exposes none — so `home-runtime.js` carries a
  module-level `mounted` guard for React StrictMode's double invocation. The
  original ran exactly once per page load; the guard preserves that.

### Paint gate
- **Trigger:** `ScrollCraft.mount()` adds `.sc-ready` to `<html>` when it
  finishes measuring and pinning.
- **State A (before):** `main#top`, `.nh-pill`, `.nh-progress` held at opacity 0.
- **State B (after):** the page paints, already laid out.

### Scroll restoration
Handled outside this component, by a `beforeInteractive` inline script in
`src/app/layout.tsx` — ported from the source page's head script:
`history.scrollRestoration = 'manual'` plus `scrollTo(0, 0)` when there is no
hash. It has to run before first layout, which is earlier than this effect.
`mountHome()` repeats the `scrollTo(0, 0)` and adds a `pageshow` handler for
back-forward-cache restores, exactly as the source does.

## Per-State Content
N/A.

## Assets
- `src/lib/sites/.../glass.js` — vendored, Apache-2.0 (21st.dev / Paper Shaders)
- `src/lib/sites/.../scrollcraft.js` — vendored from the source site, 1176 lines
- `src/lib/sites/.../home-runtime.js` — the source's inline page controller

All three are excluded from ESLint (`src/lib/sites/**`) so a reformat cannot
drift them from the originals.

## Text Content (verbatim)
N/A.

## Responsive Behavior
Identical at every width. The controller reads `matchMedia` once at mount for
`prefers-reduced-motion`, `(hover: hover) and (pointer: fine)` and
`(pointer: coarse)`, and re-reads `innerHeight` every frame — a phone's first
layout viewport can be stale, and every position-keyed reveal divides by it.
