# Tech Stack Analysis — nateherk.com `/`

## What the source is

A **hand-authored static HTML page** with its own zero-dependency scroll runtime.
Verified by re-fetching `https://www.nateherk.com/` (42126 bytes) and reading
its head: no `__NEXT_DATA__`, no `__NUXT__`, no `ng-version`, no hydration
payload, no bundler fingerprint.

Everything the page loads, in document order:

```
<link rel=canonical>                                    1
<link rel=icon ×2>, <link rel=apple-touch-icon>         3
<link rel=preconnect fonts.googleapis.com / gstatic>    2
<link rel=stylesheet  fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&display=swap>
<link rel=stylesheet  /scroll/scrollcraft.css>
<link rel=stylesheet  /scroll/home.css>
<script>            inline — scroll restoration, in the head
<script type=application/ld+json> ×2                    Person + WebSite
<script src=/scroll/glass.js>
<script src=/scroll/scrollcraft.js>
<script>            inline — the ~16KB page controller
```

**No analytics, no tag manager, no third-party JS at all.** The only external
origin is Google Fonts.

## Layer by layer

| Layer | Source | Clone | Why |
|---|---|---|---|
| Framework | none — static HTML | **Next.js 16 App Router, React 19, TypeScript strict** | the template's target |
| Rendering | a file on a CDN | server components; one client component (`ScrollRuntime`) | nothing on the page needs client state |
| CSS | `scrollcraft.css` + `home.css`, hand-written | **both ported verbatim** | see below |
| CSS methodology | custom-property token floor + BEM-ish `nh-` classes | unchanged | — |
| Tailwind | none | **not loaded** — `globals.css` is not imported | preflight would fight the ported reset |
| Fonts | Google Fonts, Inter variable with the `opsz` axis | `next/font/google`, `Inter`, `axes: ["opsz"]`, `display: swap` | self-hosted, no render-blocking third-party request |
| Font bridge | families named `"Inter"` literally | `fonts.css` re-points `--sc-font-*` at `var(--font-inter)` | `next/font` generates a scoped family name |
| Animation | `scrollcraft.js` (1176 lines) on one rAF loop | **vendored verbatim** | — |
| WebGL | `glass.js` — fluted-glass shader, Apache-2.0 (21st.dev / Paper Shaders) | **vendored verbatim** | — |
| Page controller | ~16KB inline `<script>` | `home-runtime.js`, IIFE → `mountHome()` | needs a real DOM; called from an effect |
| Smooth scroll | **none** — native, `scroll-behavior: smooth` on `<html>` | same | no Lenis, no Locomotive |
| Motion library | none | none | no Framer Motion, no GSAP |
| State management | none | none | nothing is stateful |
| API / data | none — every string is in the markup | `content.ts` (typed constants) | one place to swap the content |
| Images | `<img>` with explicit width/height, `loading="lazy"`, one `fetchpriority="high"` | identical, plain `<img>` | `next/image` wraps the element and rewrites its styles, breaking the ported CSS's descendant selectors |
| Icons | three inline SVGs | `shared/icons.tsx`, same paths | Lucide is unused on this page |
| UI library | none | shadcn/ui installed, **unused here** | the source has no dialog, tab, dropdown or form |
| Build | none | `npm run check` = lint + typecheck + build | — |
| Deploy | static host | Vercel-ready | — |

## The architectural decision

**The engine only reads attributes; it generates no DOM.** It looks for
`data-sc-act`, `data-sc-stage`, `data-sc-cue`, `data-sc-pan`, `data-nh-flow`,
`data-nh-depth`, `data-nh-wipe`, `data-nh-tick`, `data-nh-count` on markup you
author, and writes inline styles back. So the faithful port is: keep the engine
and CSS byte-for-byte, and rebuild only the markup as React components.
Re-deriving 1176 lines of tuned scroll maths from a written spec would have been
strictly less accurate.

That is also why no per-section builder agents were dispatched: extraction was
never the bottleneck, because the source files themselves were in hand.

### The three edits made to ported JS, and why

1. `export {}` appended to `glass.js` and `scrollcraft.js` so the two IIFEs are
   ES modules — they assign to `window` and are imported for their side effects.
2. The inline controller's IIFE became `export function mountHome()`.
3. A module-level `mounted` guard in `home-runtime.js`: React StrictMode invokes
   effects twice in development and `ScrollCraft.mount()` exposes no teardown.
   The original ran exactly once per page load; the guard preserves that.

All three are documented in-file. `src/lib/sites/**` is excluded from ESLint so a
reformat cannot silently drift the vendored code from its original.

### Why dynamic `import()` and not `<Script>`

`ScrollRuntime` awaits three imports in order inside `useEffect`. Both vendored
IIFEs read `window` as they evaluate, so they throw during SSR; and
`mountHome()` requires both globals to already exist. `<Script>` gives no
ordering guarantee within one strategy group; awaiting the imports does.

The one thing that genuinely must run before hydration — `scrollRestoration`
— is a `beforeInteractive` inline `<Script>` in the root layout, matching the
source's head script.

## Foundation changes outside the site namespace

| File | Change | Why |
|---|---|---|
| `src/app/layout.tsx` | Inter via `next/font/google` with the `opsz` axis; full metadata + viewport; imports the three ported stylesheets; `beforeInteractive` scroll-restoration script | matches the source's font, meta and head script |
| `src/app/globals.css` | left on disk, **no longer imported** | Tailwind preflight fights the ported reset; a future route can import it from its own layout |
| `next.config.ts` | `devIndicators: false` | the dev overlay sat in the corner of comparison screenshots |
| `eslint.config.mjs` | ignore `src/lib/sites/**`; `no-img-element` off for `src/components/sites/**` | vendored runtime must not be reformatted; plain `<img>` is deliberate |

## SEO and metadata

The source's `<meta>` set is reproduced exactly in `layout.tsx` — title,
description, keywords, author, canonical, `og:type=profile`, `og:title`,
`og:description`, `og:url`, `twitter:card=summary_large_image`,
`twitter:site=@nateherk` — plus the three icons, now served from the namespaced
asset root.

**The two `application/ld+json` blocks were deliberately omitted.** They exist
only to assert a real person's identity to search engines, and shipping them on
a clone would be actively misleading. Nothing visual depends on them. See
`HANDOFF.md` §8 — this clone must not be deployed publicly as-is.

## Performance notes

- One rAF loop drives everything; act progress is read from the engine's record
  rather than from computed styles, so there is no style flush per act per frame.
- The read phase queries every rect before the write phase touches a style, so
  layout is flushed once.
- `will-change` is declared narrowly: the plane, the ring, plates, the rail, the
  portrait, cue blocks and the progress bar.
- The shader is capped at 1e6 pixels / dpr 1.25 on desktop and 380000 / dpr 1 on
  touch, with `timeScale` 0 on touch so it only repaints while scrolling.
- Coarse pointers drop every backdrop blur — a blur over a repainting canvas
  costs a full re-blur per frame and is the first thing to drop frames.
- All images below the fold are `loading="lazy"`; the hero portrait is
  `fetchPriority="high"`.

## Licensing

`glass.js` is Apache-2.0 (21st.dev / Paper Shaders) and carries its notice in
the file. `scrollcraft.css`, `home.css`, `scrollcraft.js` and the page
controller are the source site's own work, reproduced here for a local clone —
which is exactly why the identity caveat above matters.
