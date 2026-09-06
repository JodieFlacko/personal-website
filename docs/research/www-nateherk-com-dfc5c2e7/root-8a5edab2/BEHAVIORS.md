# Behaviour Bible — nateherk.com `/`

Every behaviour below was read out of the site's own `scrollcraft.js`,
`glass.js` and inline page controller rather than inferred from observation, so
the triggers and constants are exact.

## Global

| Behaviour | Mechanism |
|---|---|
| Smooth scrolling | `scroll-behavior: smooth` on `html`. **No JS scroll library.** Disabled under `prefers-reduced-motion`. |
| Scroll restoration | `history.scrollRestoration = 'manual'`; `scrollTo(0,0)` before first layout and on `pageshow` when persisted. |
| Paint gate | Engine adds `.sc-ready` to `<html>` at the end of `mount()`. Until then `main#top` and `.nh-pill` are `opacity: 0`. |
| Progress smoothing | `data-sc-smooth = 8`/s (`13` coarse); `data-sc-lerp = 0.45` on coarse only. |
| Reduced motion | Glass `timeScale: 0`, all reveals resolve instantly, ring/depth lerps set to 1. |

### The glass (`canvas#glass`)

WebGL fluted-glass shader. Palette `['#EEF3F9','#F9FBFD','#CCE6FF','#3BAAFF']`,
`scale 1.18`, `paramA 0.34`, `detail 1.824`, `grain 0.032`, `seed 3.0`,
`shadeBase 0.90 / highlight 0.13 / shadow 0.06`. Cursor parallax only on
fine pointers. `timeScale` 0.3 on fine pointers, 0 on touch/reduced.

Per-frame bindings from the page controller:

| Uniform | Bound to |
|---|---|
| `offsetY` | `-scrollY / vh * 0.22`, eased at `1 - exp(-7·dt)` |
| `offsetX` | `scrollY / vh * 0.03`, same easing |
| `intensity` | `0.22 + min(0.34, velocity·0.16)`, eased at `1 - exp(-4·dt)` |
| `rotate` | `(ringProgress - 0.5) · 0.22` while the recognition stage is on screen, else 0 |
| intensity floor | raised to `0.46` (fine) / `0.34` (coarse) while the ring is on screen — the page's brightest moment |

Velocity is measured in viewport-heights per second and attacks faster than it
decays (`0.35` rising, `1 - exp(-2.2·dt)` falling). On coarse pointers velocity
is pinned to 0 because touch deltas arrive in bursts and would make it pulse.

## Reveal primitives

| Attribute | Behaviour |
|---|---|
| `data-nh-flow` | Text split into `span.fw` word spans with `--i` index; `.is-flowed` added on IntersectionObserver `threshold: 0.12, rootMargin: '0px 0px -6% 0px'`. **Fires once**, then unobserved. |
| `data-nh-flow-delay` | Sets `--nh-flow-delay` in ms. |
| `data-nh-flow-step` | Per-word stagger, clamped to `min(step, 1100/wordCount)` ms so long blocks never exceed 1.1s total. |
| `data-nh-flow="block"` | Skips word splitting; the whole block reveals as one. |
| `data-nh-tick` | Counts 0 → target over **2200ms** starting immediately on load (hero stats), eased `1-(1-t)³`. |
| `data-nh-count` + `-dur` | Counts 0 → target on first intersection, 120ms delay, duration from attribute (2600ms on every registry row). |
| `data-nh-depth` | Opacity `0.06 → 1` and `translateY(travel → 0) scale(0.965 → 1)` across the element's travel from viewport bottom to 50% height. Default travel 44px, overridden per element by `data-nh-depth-travel`. Adds `.nh-seen` and clears inline styles when complete. |
| `data-nh-wipe` | `clip-path: inset(N% 0 0 0 round 6px 14px 14px 6px)` driven 100% → 0 across `min(height, vh·0.8)·0.9`. Inline style cleared at completion. |
| `data-sc-cue="a b c d"` | Engine-driven opacity/rise window within a pinned act's progress. |
| `data-sc-tilt="6"` | Pointer-driven tilt, 6° maximum. |

## Per-act behaviour

### 1 · Hero (`#hero`, pin 1.35)
- Portrait recedes: `translate3d(0, p·18px, 0) scale(1 - p·0.05)`. No fade — the
  stage's own slide carries it off.
- Stats tick on load (delays 200ms / 320ms); headline, sub and CTA flow at
  260 / 640 / 1050ms.
- **Nav handoff:** `.nh-pill` gains `.is-docked` when the hero stage's
  `getBoundingClientRect().bottom < vh · 0.62`. Before that it is parked
  off-screen at `y: -53`.

### 2 · Proof (`.nh-section--first`, flow)
- Plane rises via `data-nh-depth`.
- Four registry counters run 2600ms on first intersection.
- Row hover: the whole `.nh-reg__row` is a link with its own hover treatment.

### 3 · Recognition (`#recognition`, pin 3.4)
- Seven plates parked at `--nh-a = i · 360/7`.
- Scroll turns the ring to `-p · TURN` where `TURN = 360 · (N-1)/N = 308.57°`,
  so the **last plate lands front and centre exactly as the act ends**.
- Lerp `1 - exp(-7·dt)`.
- Pointer lean (fine pointers only): `leanX = -6 - (relY - 0.5)·8`,
  `leanY = (relX - 0.5)·10`, resetting to `-6, 0` on pointerleave.
- Per-plate depth: `facing = cos(angle)`, opacity `0.18 + 0.82·clamp01((facing+0.35)/1.35)`,
  and `visibility: hidden` below `facing < -0.06` (Safari renders backfaces
  otherwise).
- A plate flows its words the moment it faces the viewer — the entry observer
  can miss a card that arrives by turning rather than by scrolling.
- Focus on a plate link scrolls the act to the progress that faces it.

### 4 · Story (`.nh-section`, flow)
- Plane depth + two photos with per-element travel: 70px (grad), 110px (office).

### 5 · Rooms (`#rooms`, pan 3.5)
- Engine pans `#rail` horizontally; `data-sc-pan="0.05"` is the lead-in held
  before travel begins.
- Per-item settle: item *i* animates `--nh-settle` 0 → 1 over
  `[0.02 + i·0.13, +0.16]` of act progress. **Item 0 is exempt** (already on
  screen when the act begins).

### 6 · Book (`.nh-section`, flow)
- Cover wipes up via `data-nh-wipe`; sheen highlight overflows once the inline
  clip-path is cleared.

### 7 · Close (`#watch`, pin 1.5)
- Three staggered cues: headline `0 1 0 0`, alt line `0.05 1 0.25 0`,
  signature `0.12 1 0.3 0`.
- Focus inside this act parks the page at 60% of the act's travel, where the
  cues are open (centring a pinned act lands at progress 0, where they are shut).

## Responsive

| Width | Behaviour |
|---|---|
| 1440 (desktop) | Full layout as measured. |
| 768 (tablet) | Fluid tokens compress via `clamp()`; gutter `clamp(1.25rem, 5vw, 5.5rem)`. |
| 390 (mobile) | Coarse-pointer branch: glass `timeScale 0`, `maxPixels 380000`, `maxDpr 1`, velocity pinned, smoothing 13, lerp 0.45. |

Breakpoints live in the ported CSS and are inherited exactly; the type ramp and
spacing are fluid `clamp()` values rather than step breakpoints, so most of the
responsive behaviour is continuous rather than a switch at a threshold.

## Engine quirk worth knowing

`scrollcraft.js`'s scroll listener runs `read(); ticking = false;` in that
order. Inside `read()`, the "keep ticking until settled" reschedule is guarded
by `if (!ticking)` — which is still `true` at that point. So progress advances
**one step per scroll event**. Continuous human scrolling hides this completely,
but a single programmatic `scrollTo()` leaves progress frozen part-way. Any
automated verification must either scroll in many small steps or call
`ScrollCraft.instances[0].read()` in a loop. This is inherited behaviour,
present identically on the source site.
