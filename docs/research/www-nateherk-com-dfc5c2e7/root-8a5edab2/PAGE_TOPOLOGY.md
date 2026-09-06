# Page Topology — nateherk.com `/`

Source: `https://www.nateherk.com/` · captured at 1440×900, dpr 1
Document height: **11829px** (clone matches exactly)

## Technical stack

| | Source | Clone |
|---|---|---|
| Framework | None — hand-authored static HTML | Next.js 16 App Router, React 19 |
| CSS | `scroll/scrollcraft.css` (floor) + `scroll/home.css` (brand) | Both ported verbatim |
| Fonts | Google Fonts Inter `opsz,wght@14..32,400..800` | `next/font/google` Inter, `opsz` axis |
| Animation | Custom `scrollcraft.js` runtime + `glass.js` WebGL shader | Both vendored verbatim |
| Smooth scroll library | **None** — native scrolling, `scroll-behavior: smooth` on `html` | Same |
| Images | `<img>` with explicit width/height, `loading="lazy"` | Same (plain `<img>`, not `next/image`) |

No Lenis, no Locomotive, no Framer, no Webflow. The engine drives everything
from one scroll value on a single rAF loop and generates no DOM.

## Fixed furniture (outside `<main>`)

| Element | z-index | Notes |
|---|---|---|
| `canvas#glass.nh-glass` | 0 | WebGL fluted-glass pane, `position: fixed`, `100vw × 100lvh` |
| `.sc-grain` | 3 | Fractal-noise overlay at 3% opacity (inline SVG data-URI) |
| `.nh-progress[data-sc-progress]` | 95 | 3px reading-progress hairline, driven by `scaleX()` |
| `nav.nh-pill` | 60 | Docking nav; parked at `y: -53` until `.is-docked` |

`main#top` sits at `z-index: 1`. Until the engine adds `.sc-ready` to `<html>`,
`main#top` and `.nh-pill` are held at `opacity: 0` so nothing paints before the
acts are pinned.

## The seven acts

Order is the page's argument; the engine reads it from the DOM.

| # | Name | Selector | Act | Span | Top | Height | Interaction model |
|---|---|---|---|---|---|---|---|
| 1 | Clarity (hero) | `#hero` | `pin` | 1.35 | 0 | 1215 | scroll-driven (pinned stage) |
| 2 | Confidence (proof) | `.nh-section--first` | `flow` | — | 1215 | 936 | scroll-driven reveals + counters |
| 3 | Awe (recognition) | `#recognition` | `pin` | 3.4 | 2151 | 3060 | scroll-driven 3D ring + pointer lean |
| 4 | Intimacy (story) | `.nh-section` | `flow` | — | 5211 | 1224 | scroll-driven depth entrances |
| 5 | Presence (rooms) | `#rooms` | `pan` | 3.5 | 6435 | 3150 | scroll-driven horizontal pan |
| 6 | Delight (book) | `.nh-section` | `flow` | — | 9585 | 894 | scroll-driven clip-path wipe |
| 7 | Resolve (close) | `#watch` | `pin` | 1.5 | 10479 | 1350 | scroll-driven cues; footer inside stage |

**Every section is scroll-driven. There are no click-driven tabs, no
carousels, no accordions, and no time-driven cycling anywhere on the page.**
The only pointer-driven behaviour is the recognition ring's lean and per-element
hover states.

### Act progress formulas (from the engine)

- pinned/pan: `p = (y - top) / (height - vh)`
- flow: `p = (y + vh - top) / (height + vh)`

Progress is smoothed toward its goal at `data-sc-smooth = 8` per second
(`13` on coarse pointers), and published as `--sc-p` on each act element.

## Z-index layers

```
95  .nh-progress
60  .nh-pill                    (--sc-z-chrome)
20  .sc-copy                    (--sc-z-copy)
 3  .sc-grain
 1  main#top, [data-sc-stage]   (--sc-z-stage)
 0  canvas#glass
```

## Assembly notes

- Sticky stages: each pinned/pan act's first `[data-sc-stage]` child is
  `position: sticky`. The engine sets the outer section height from the span.
- The footer lives *inside* act 7's stage, so the page ends on a held frame.
- `history.scrollRestoration = 'manual'` and a `scrollTo(0,0)` run before first
  layout, because restoring a mid-page position paints pinned acts before the
  engine has laid them out.
