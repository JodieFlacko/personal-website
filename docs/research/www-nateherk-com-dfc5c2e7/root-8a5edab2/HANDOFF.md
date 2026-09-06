# Handoff — nateherk.com clone

**Status: complete. Build, behaviour and documentation are all done; the only
open item is whether to commit.**

Read this file, then the rest of this directory:

| Document | What it covers |
|---|---|
| `PAGE_TOPOLOGY.md` | the source's page structure, act table, z-index layers |
| `BEHAVIORS.md` | every trigger and constant, per act |
| `DESIGN_TOKENS.md` | colour, type ramp, spacing, radius, elevation, motion — resolved at 1440 / 768 / 390 |
| `COMPONENT_INVENTORY.md` | the eleven modules and what is deliberately absent |
| `LAYOUT_ARCHITECTURE.md` | measured act table at three widths, grid system, breakpoints |
| `INTERACTION_PATTERNS.md` | the same behaviours organised by mechanism |
| `TECH_STACK_ANALYSIS.md` | what the source is, layer by layer, and the clone's equivalent |
| `components/*.spec.md` | one exhaustive spec per component, with computed styles |

You do not need to re-inspect the source site.

---

## 1. What was asked

`/clone-website https://www.nateherk.com/` — pixel-perfect clone into this
Next.js 16 template. Defaults from the skill apply: full fidelity, no
customisation, no backend.

## 2. Output plan (already fixed — do not change these keys)

| | |
|---|---|
| app-root | `.` (repo root) |
| site-key | `www-nateherk-com-dfc5c2e7` |
| page-key | `root-8a5edab2` |
| route | `src/app/page.tsx` (replaced the untouched template scaffold — permitted for a first clone) |
| artifacts | `docs/research/www-nateherk-com-dfc5c2e7/root-8a5edab2/` |
| screenshots | `docs/design-references/www-nateherk-com-dfc5c2e7/root-8a5edab2/` |
| components | `src/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/` |
| shared components | `src/components/sites/www-nateherk-com-dfc5c2e7/shared/` |
| assets | `public/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/` |

No other route existed. Nothing was destroyed.

## 3. The single most important architectural decision

**The source site is hand-authored static HTML with its own zero-dependency
scroll runtime. Its CSS and JS were ported verbatim rather than reimplemented.**

The source ships:
- `scroll/scrollcraft.css` (design-token floor + engine device styles)
- `scroll/home.css` (Nate Herk brand layer + all page classes)
- `scroll/scrollcraft.js` (1176 lines — attribute-driven scroll engine, **generates no DOM**)
- `scroll/glass.js` (WebGL fluted-glass shader, ported from 21st.dev / Paper Shaders, Apache-2.0)
- a 16KB inline page controller

Because the engine only *reads* `data-sc-*` / `data-nh-*` attributes off markup
you author, the faithful port is: keep engine + CSS as-is, and rebuild only the
markup as React components. Re-deriving 1176 lines of tuned scroll maths from a
spec would have been strictly less accurate. This is why there are no per-section
builder agents — extraction was not the bottleneck; the verbatim source was
already in hand.

### Where the ported files live

| Source file | Ported to |
|---|---|
| `scrollcraft.css` | `src/styles/sites/<site>/<page>/scrollcraft.css` (verbatim) |
| `home.css` | `src/styles/sites/<site>/<page>/home.css` (verbatim) |
| `glass.js` | `src/lib/sites/<site>/<page>/glass.js` (verbatim + `export {}` at EOF) |
| `scrollcraft.js` | `src/lib/sites/<site>/<page>/scrollcraft.js` (verbatim + `export {}` at EOF) |
| inline controller | `src/lib/sites/<site>/<page>/home-runtime.js` (IIFE → `mountHome()` + singleton guard) |

Only three edits were made to ported JS, all documented in-file:
1. `export {}` appended to the two IIFEs so they are ES modules (they assign to `window`).
2. The inline controller's IIFE became `export function mountHome()`.
3. A module-level `mounted` guard, because React StrictMode double-invokes effects
   and `ScrollCraft.mount()` exposes no teardown. The original ran once per page load.

`ScrollRuntime.tsx` boots them with **sequential dynamic `import()` inside
`useEffect`** — not `<Script>` tags. Two reasons: the IIFEs read `window` at
evaluation time (would throw during SSR), and the controller needs both globals
already installed. `<Script>` does not guarantee intra-strategy ordering.

## 4. Foundation changes outside the site namespace

| File | Change | Why |
|---|---|---|
| `src/app/layout.tsx` | Inter via `next/font/google` with `opsz` axis; full metadata + viewport; imports the three ported stylesheets | Source uses `Inter opsz,wght@14..32,400..800` |
| `src/app/globals.css` | **left on disk but no longer imported** | Tailwind preflight fights the ported reset. The clone uses zero Tailwind. A future route can import it from its own layout. |
| `src/styles/.../fonts.css` | re-points `--sc-font-*` at `var(--font-inter)` | `next/font` generates a scoped family name, so the ported CSS's literal `"Inter"` would not match |
| `next.config.ts` | `devIndicators: false` | the dev overlay sat in the corner of comparison screenshots |
| `eslint.config.mjs` | ignore `src/lib/sites/**`; `no-img-element` off for `src/components/sites/**` | ported runtime must not be reformatted; `next/image` wraps images and rewrites styles, breaking the ported CSS's descendant selectors |

Plain `<img>` is deliberate throughout. `next/link` is used only for `/` (the
one route that exists); `/about`, `/thoughts`, `/terms-of-access` stay as `<a>`
because those pages are out of scope and do not exist.

## 5. Verification already completed — do not redo

### Exact numeric match at 1440×900, dpr 1
20 selectors compared between source and clone via CDP. **Every** value
identical: bounding boxes, font-size, font-weight, line-height, letter-spacing,
color, background-color, padding, border-radius. Includes `.nh-pill`,
`.nh-hero__bar`, `h1.sc-display`, `.nh-hero__cta .nh-btn`, `.nh-plane`, and all
seven act tops/heights.

- Document height: **11829px on both.**
- `[data-nh-flow]` element count: **64 on both.**
- Act tops: 0 / 1215 / 2151 / 5211 / 6435 / 9585 / 10479 — identical.

> One apparent hero-portrait mismatch was investigated and **is not a defect**:
> the reference tab was frozen mid-animation at `--sc-p 0.3334` because
> background tabs throttle rAF. Applying its `scale(0.9833) translateY(6px)` to
> the clone's numbers reproduces the source's box exactly.

### Behaviour verified at 44fps on Windows Chrome
Glass shader live on GPU; ring rotating (`--nh-ring-y: -131.42deg` at
`recogP 0.4976`) with correct plate order, depth fade and back-face culling;
rail panning (`translateX(-2136.74px)` at `roomsP 0.9233`, all six rooms
settled); book cover wipe running to completion and clearing its inline
clip-path; counters ticking from 0; word-by-word reveals; pill nav docking;
progress bar; signature and footer cues.

### Mobile
Hero stacks and centres correctly at 502 CSS px (Chrome clamps windows to
~500px minimum, so 390 needs CDP device emulation).

### Build
`npm run check` (lint + typecheck + build) **passes clean**, re-run after the
scroll-restoration fix.

## 6. Environment gotchas that cost real time — read before touching a browser

1. **Two browsers are available and they behave differently.**
   - `mcp__chrome-devtools__*` → Chrome on the **Linux/WSL** side. Exact viewport
     control via `resize_page`, but **software rendering and rAF throttled to ~2fps**.
     Use it for measurement, not for animation.
   - `mcp__claude-in-chrome__*` → Chrome on **Windows** (deviceId
     `126e0984-e62e-42fd-872f-df97d0332dd9`). Real GPU, ~44fps. Use it for
     behaviour and visual checks. It reaches the WSL dev server at
     `http://localhost:3000` fine.

2. **`resize_window` silently no-ops on a maximized window.** Send
   `key: "win+down"` to the tab first to restore it, then resize. Verified to
   work. Chrome enforces a **minimum window width around 500 CSS px**.

3. **Tabs can live in different windows.** `resize_window` only affects the
   window containing that tab, and a background tab reports a **stale
   `innerWidth`** until it is rendered. An apparent "per-origin zoom difference"
   between the two tabs was actually just two differently-sized windows — check
   this before concluding anything about zoom. Page-zoom keyboard shortcuts
   (`ctrl+0`) are blocked by the tool.

4. **`javascript_tool` output is content-filtered.** Returning URLs with query
   strings trips a `[BLOCKED: Cookie/query string data]` error. Strip query
   strings (`h.split('?')[0]`) before returning them.

5. **The scroll engine advances one step per scroll event.** In
   `scrollcraft.js` the scroll listener runs `read(); ticking = false;` in that
   order, so `read()`'s own "keep going until settled" reschedule is suppressed
   while `ticking` is still `true`. Continuous human scrolling hides this
   completely; a single programmatic `scrollTo()` leaves progress frozen
   part-way. **This is inherited behaviour, present identically on the source
   site — it is not a clone bug.** To settle a page for a screenshot either
   scroll with real wheel events (`computer` action `scroll`) or loop:
   ```js
   const inst = window.ScrollCraft.instances[0];
   for (…) { await sleep(60); inst.read(); }   // until acts' p stops changing
   ```

6. **`[data-nh-flow]` reveals are one-shot IntersectionObserver triggers.** A tab
   that jumped straight to y=1500 shows fewer revealed elements than a tab that
   scrolled the whole page. Before comparing, prime **both** pages by stepping
   through the document (≈260px steps, ≈220ms dwell) or the diff is meaningless.

## 7. What was finished in the follow-up session

1. **Component spec files** — all eleven written to `components/`, plus a
   `_README.md` that records the measurement environment and its two caveats.
   Every computed value in them was re-measured, not transcribed.
2. **The five `INSPECTION_GUIDE.md` documents** — written, listed in the table
   at the top of this file.
3. **Responsive pass** — done properly via CDP device metrics rather than window
   resizing, at **768×1024** and **390×844** (the latter with touch emulation,
   so the `pointer: coarse` branch actually engages). Act tables, grid tracks,
   ring geometry, rail width and the coarse-pointer surface swaps are all
   recorded in `LAYOUT_ARCHITECTURE.md` and in each spec's Responsive section.
   Screenshots: `clone-768w-*.png` and `clone-390w-*.png` in the screenshot root.
4. **One real defect found and fixed.** The source sets
   `history.scrollRestoration = 'manual'` in a head script *before first layout*;
   the clone set it nowhere, so a refresh mid-page could paint pinned acts before
   the engine had laid them out. `src/app/layout.tsx` now ships it as a
   `beforeInteractive` inline `<Script>`, which is the earliest the App Router
   offers. (`BEHAVIORS.md` had always described the source's behaviour here — the
   clone simply had not implemented it.)

### Measurement note for anyone re-checking these numbers

The verified geometry in §5 was taken with a **classic scrollbar present**, i.e.
a 1430px content box at a 1440px viewport. Measuring with overlay scrollbars
gives a 1440px content box, the flow acts get shorter, and the document lands at
**11755px** instead of 11829px. Nothing is wrong in either case — but hold the
scrollbar constant before concluding the clone has drifted.

### Not done

- The two Windows-Chrome tabs from the original session (`239703294` = clone,
  `239703303` = source) were left open; that browser was not reachable in the
  follow-up session, so close them by hand.

## 8. Judgement call the user should confirm

The clone reproduces a **real person's identity site** — name, photographs,
signature, and brand. Two things follow:

- The `Person` and `WebSite` JSON-LD blocks from the source were **deliberately
  omitted**. They exist only to assert identity to search engines, and shipping
  them on a clone would be actively misleading. Everything visual is unaffected.
  Add your own when the content is replaced.
- This is fine as a local template/reference, but **must not be deployed
  publicly as-is** — it would function as impersonation. The repo is
  `giuseppe-ciccone/personal-website`, so the expected next step is swapping the
  content for Giuseppe's while keeping the structure and motion.

## 9. Resuming

```bash
npm run dev            # already running on :3000 at time of writing
npm run check          # lint + typecheck + build, currently clean
node scripts/download-assets-www-nateherk-com-dfc5c2e7-root-8a5edab2.mjs   # idempotent, 24/24
```

### Driving a browser from this machine

`chrome-devtools-axi` was **broken** in the follow-up session: its bundled
`chrome-devtools-mcp` (1.8.0) now requires a `pageId` argument that the wrapper
does not send, so `eval`, `snapshot` and `pages` all fail with
`Invalid arguments … Required at pageId` (`resize` and `screenshot` still work).
Both `mcp__chrome-devtools__*` and `mcp__playwright__*` failed to connect at all.

The workaround, and the better tool for this page anyway, is to drive Chrome
directly:

```bash
google-chrome --headless=new --remote-debugging-port=9333 \
  --user-data-dir=<scratch>/chrome-profile --no-first-run --disable-gpu \
  --window-size=1440,900 about:blank &
```

then talk CDP over Node 22's global `WebSocket` (`/json/version` →
`Target.createTarget` → `Target.attachToTarget {flatten:true}` →
`Emulation.setDeviceMetricsOverride` → `Runtime.evaluate`). Two things this buys
that the wrappers do not: exact device metrics at 390px (Chrome refuses window
widths below ~500px), and touch emulation, without which the `pointer: coarse`
branch never engages. Do **not** pass `--hide-scrollbars` if you want numbers
comparable to §5.

Priming matters: step the whole document in ~220px hops, pumping
`ScrollCraft.instances[0].read()` after each, until the count of
`[data-nh-flow].is-flowed` stops rising — otherwise reveals are half-open and
every measurement below the fold is wrong.

Source files (HTML/CSS/JS pulled from the live site) were kept in the session
scratchpad, not the repo. Re-fetch with:
```bash
curl -sO https://www.nateherk.com/scroll/scrollcraft.css
curl -sO https://www.nateherk.com/scroll/home.css
curl -sO https://www.nateherk.com/scroll/scrollcraft.js
curl -sO https://www.nateherk.com/scroll/glass.js
curl -s  https://www.nateherk.com/ -o index.html
```
