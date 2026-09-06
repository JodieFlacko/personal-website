# Layout Architecture — nateherk.com `/`

Measured at 1440×900 / 768×1024 / 390×844, dpr 1, with a classic scrollbar
present (content widths 1430 / 758 / 380). `PAGE_TOPOLOGY.md` covers the same
ground from the source's side; this document is the clone's measured layout.

## Document shape

| | 1440×900 | 768×1024 | 390×844 |
|---|---|---|---|
| Document height | **11829px** | 13542px | 12025px |
| Acts | 7 | 7 | 7 |
| `[data-nh-flow]` elements | 64 | 64 | 64 |

### Act table (top / height, px)

| # | Act | Mode | Span | 1440 | 768 | 390 |
|---|---|---|---|---|---|---|
| 1 | `#hero` | pin | 1.35 | 0 / 1215 | 0 / 1382 | 0 / 1139 |
| 2 | `.nh-section--first` | flow | — | 1215 / 936 | 1382 / 1044 | 1139 / 1226 |
| 3 | `#recognition` | pin | 3.4 | 2151 / 3060 | 2427 / 3482 | 2365 / 2870 |
| 4 | `.nh-section` (story) | flow | — | 5211 / 1224 | 5908 / 1347 | 5235 / 1505 |
| 5 | `#rooms` | pan | 3.5 | 6435 / 3150 | 7255 / 3584 | 6740 / 2954 |
| 6 | `.nh-section` (book) | flow | — | 9585 / 894 | 10839 / 1167 | 9694 / 1065 |
| 7 | `#watch` | pin | 1.5 | 10479 / 1350 | 12006 / 1536 | 10759 / 1266 |

A pinned or pan act's height is `span × viewport height` (1.35 × 900 = 1215,
3.4 × 900 = 3060, 3.5 × 900 = 3150, 1.5 × 900 = 1350). A flow act's height is
its content.

> Measuring with **overlay** scrollbars instead gives a 1440px content box, the
> flow acts get shorter, and the document lands at 11755px. Neither is wrong —
> but comparisons must hold the scrollbar constant.

### Act progress formulas (from the engine)

- pinned / pan: `p = (y - top) / (height - vh)`
- flow: `p = (y + vh - top) / (height + vh)`

Progress is smoothed toward its goal at `data-sc-smooth = 8` per second (13 on
coarse pointers, which also sets `data-sc-lerp = 0.45`), and published as
`--sc-p` on each act element.

## Grid system

No CSS framework and no grid utility classes. Three mechanisms:

1. **The plane** — `width: min(100% - 2 × var(--sc-gutter), var(--sc-maxw))`,
   `margin-inline: auto`. At 1440 that is **1286px** inside a 1430px viewport;
   the 82rem (1312px) cap never binds until ~1456px.
2. **Per-section CSS Grid** with explicit fr ratios:

| Section | Columns | Resolved at 1440 | Gap |
|---|---|---|---|
| `.nh-proof__head` | `minmax(0,1fr) minmax(0,1.2fr)` | 492.91 / 591.5 | 57.6px |
| `.nh-reg__row` | `minmax(8ch,0.9fr) minmax(0,1.05fr) minmax(0,2fr) auto` | 236.5 / 275.92 / 525.58 / 16 | 24px |
| `.nh-story` | `minmax(0,1.15fr) minmax(0,1fr)` | 564.63 / 490.97 | 86.4px |
| `.nh-book` | `minmax(0,0.9fr) minmax(0,1.1fr)` | 475.02 / 580.59 | 86.4px |
| `.nh-close__inner` | one centred column | 1274.58 | 24px |
| `.nh-hero` | `1fr` (children are absolutely positioned) | 1430 | — |

3. **Flexbox** for the rail (`#rail`, 3838.36px wide), the hero bar, the trust
   row, the footer and every button.

`minmax(0, …)` everywhere is deliberate: an `fr` track's default `min-width:
auto` refuses to shrink below its content and would blow the grid out.

## Stacking and pinning

```
 95  .nh-progress                       fixed, top hairline
 60  .nh-pill               --sc-z-chrome
 20  .sc-copy blocks        --sc-z-copy
  3  .sc-grain                          fixed noise
  1  main#top, [data-sc-stage]  --sc-z-stage
  0  canvas#glass                       fixed WebGL pane
```

Inside the hero stage there is a second, local stack: scrim 1 → portrait 2 →
bar 3, with the copy on the shared 20.

**Sticky stages.** Each pinned or pan act's first `[data-sc-stage]` child is
`position: sticky; top: 0; height: 100vh` (then `100svh`), `overflow: clip`. The
engine sets the outer section's height from the span, so the stage sticks for
exactly `(span - 1) × vh` of travel. Flow acts have no stage and scroll
normally.

**Paint gate.** `html:not(.sc-ready) main#top`, `.nh-pill` and `.nh-progress` are
held at `opacity: 0` until the engine finishes measuring and adds `.sc-ready` —
nothing paints before the acts are pinned.

**The footer is inside act 7's stage**, so the page ends on a held frame rather
than scrolling past one.

## Fixed furniture

| Element | Box | Notes |
|---|---|---|
| `canvas#glass` | `fixed; inset: 0; 100vw × 100lvh` | `lvh` so a collapsing address bar never resizes the buffer |
| `.sc-grain` | `fixed; inset: 0` | opacity 0.03 |
| `.nh-progress` | `fixed; top: env(safe-area-inset-top); height: 3px` | `transform: scaleX(p)` |
| `.nh-pill` | `fixed; top: 0.9rem; left: 50%` | parked at `translate(-50%, -140%)` ≈ y −53px until docked |

## Scroll behaviour

- **Native scrolling.** `scroll-behavior: smooth` on `<html>`, disabled under
  `prefers-reduced-motion`. No Lenis, no Locomotive, no scroll-jacking.
- **No scroll snap** except in the reduced-motion fallback for the rail.
- **Restoration:** `history.scrollRestoration = 'manual'` plus `scrollTo(0, 0)`
  runs from a `beforeInteractive` script in the root layout — restoring a
  mid-page position would paint pinned acts before the engine has laid them out.
  The controller repeats it on mount and on `pageshow` when persisted.
- **`overflow-x: clip`** on `<body>`, so the 3838px rail cannot widen the page.

## Responsive behaviour

Two width breakpoints in `home.css`, one in `scrollcraft.css`, plus one
height companion and one pointer query. Everything else is fluid `clamp()`, so
most of the responsive behaviour is continuous rather than a switch.

### ≤1100px — column collapse
`.nh-story`, `.nh-book` and `.nh-proof__head` become single-column;
`.nh-story__photos` drops to `min-height: 28rem; max-width: 34rem`;
`.nh-book__art` to `min(70%, 18rem)`; the proof lede moves to `justify-self: start`.

### ≤860px — the restack
- Hero: copy centres at the bottom, portrait moves above it (`top: 9svh`,
  `z-index: 0`), scrim becomes a full-width bottom band, stats forced to one row,
  bar text links hidden
- Registry rows: 3 columns with the description spanning `1 / -1`
- Ring: radius `clamp(15rem, 70vw, 19rem)`, plates `clamp(12rem, 56vw, 14.5rem)`
  with `transform-style: flat`, trophy shrinks and rises, **caption hidden**
- Rail: every room shape capped in `vw`
- Pill: wordmark hidden, tighter link padding
- Close: smaller heading, top padding so it clears the pill, compact centred footer
- `scrollcraft.css` also relaxes `.sc-copy` (full-bleed, `max-width: none`)

At **768px both branches are already active** — 768 < 860. The tablet column in
the act table is therefore the restacked layout at a larger scale, not an
intermediate one.

### `max-height: 720px` and ≤860px — short phones
Portrait to 36svh at 11svh with an earlier mask fade; hero h1
`clamp(1.9rem, 8vw, 2.4rem)`; ring copy at 3.6rem; trophy `clamp(6rem, 28vw, 8rem)`;
ring `translateY(12vh)`.

### `pointer: coarse` — not a width
Backdrop blur is dropped from every frosted surface and replaced with an opaque
plate (`.nh-pill` → `rgba(250, 251, 253, 0.94)`, `.nh-plate__in` →
`rgba(250, 251, 253, 0.9)`, `.nh-foot` → `rgba(255, 255, 255, 0.88)`, and so on),
and the per-word blur is dropped from `[data-nh-flow] .fw`. A backdrop blur over
a canvas that repaints while scrolling costs a full re-blur per frame on a phone
GPU.

## Verified geometry

Twenty selectors were compared between the live source and the clone at
1440×900 — bounding boxes, font metrics, colour, padding, radius — and every
value matched, including all seven act tops and heights, the document height
(11829px) and the `[data-nh-flow]` count (64). See `HANDOFF.md` §5.
