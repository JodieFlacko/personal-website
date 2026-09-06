# Interaction Patterns — nateherk.com `/`

Every trigger and constant here was read out of the ported `scrollcraft.js`,
`glass.js` and `home-runtime.js` rather than inferred from watching the page, so
the numbers are exact. `BEHAVIORS.md` is the same material organised by act;
this document is organised by mechanism.

## The one loop

`home-runtime.js` runs a single `requestAnimationFrame` loop with a strict
read-then-write order, because a style flush per act per frame is what a phone
drops frames on:

```
dt = min((now - last)/1000, 0.1)      clamped; falls back to 1/60
vh = innerHeight                      re-read every frame — a phone's first
                                      layout viewport can be stale (3376px on
                                      emulated iOS) and every position-keyed
                                      reveal divides by it
── read ──   heroStage rect · ringStage rect · depthRead() · wipeRead()
── write ──  heroTick() · depthWrite() · wipeTick() · ringTick(dt) · railTick()
             glassTick(dt, ringP)     skipped entirely under reduced motion
```

Act progress is never read back from a computed style — the controller reads the
engine's own record (`actRec[id].p`).

## Interaction models present

| Model | Present? | Where |
|---|---|---|
| Scroll-driven | **yes** | all seven acts |
| Pointer-driven | limited | ring lean, `[data-sc-tilt]`, hover states |
| Click-driven | **no** | no tabs, accordions, modals or carousels |
| Time-driven | only on load | the two hero counters |
| Form / stateful | **no** | no inputs anywhere |

## Scroll primitives

### Act progress and smoothing
- pinned/pan `p = (y - top) / (height - vh)`; flow `p = (y + vh - top) / (height + vh)`
- smoothed toward its goal at `data-sc-smooth` = **8**/s (**13** on coarse),
  published as `--sc-p`
- coarse pointers additionally set `data-sc-lerp = 0.45`, so touch follows
  tighter and the page never feels behind the finger

### `data-sc-cue="from to rampIn rampOut"`
The ramps are **fractions of the window**, defaulting to 0.3 each, which leaves a
~40% plateau at full opacity in the middle. Without a plateau a cue is a
triangle: it touches opacity 1 for a single instant, so every heading reads as
slightly faded unless the reader stops on exactly the right pixel.

```
vis = 0                                     p < from
    = smooth((p - from)/(inEnd - from))     ramping in
    = 1                                     the plateau
    = smooth(1 - (p - outStart)/(to - outStart))   ramping out

opacity   = vis
transform = translate3d(0, (1 - vis) * 2.4 * rise vh, 0)     rise from data-sc-rise, default 1
pointer-events flips to auto at vis > 0.5
```

Cues on this page:

| Element | Cue | Effect |
|---|---|---|
| `.nh-hero__bar` | `0 1 0 0` + `data-sc-rise="0"` | present from the first pixel, no rise |
| `.nh-hero__copy` | `0 1 0 0` | present from the first pixel, 2.4vh rise |
| `.nh-ring__copy` | `0 1 0 0.12` | fades out over the last 12% |
| `.nh-ring__caption` | `0.06 1 0.12 0.12` | opens and closes on 12% ramps |
| `.nh-close h2`, CTA `p` | `0 1 0 0` | held open across the pin |
| `.nh-close__alt` | `0.05 1 0.25 0` | starts at p 0.05, 25% ramp |
| `.nh-close__sig` | `0.12 1 0.3 0` | starts at p 0.12, 30% ramp |

`[data-sc-cue] { opacity: 0 }` is the pre-paint state, so nothing flashes before
the first `read()`.

### `data-sc-pan`
The rail's horizontal travel. The attribute's value (`0.05`) is the extra
lead-in held before travel begins. Under reduced motion the transform is zeroed
**and** the stage becomes a real scroll region (`overflow-x: auto`,
`overscroll-behavior-x: contain`, `scroll-snap-type: x proximity`, children
`scroll-snap-align: center`) — a rail's travel *is* its navigation, so zeroing it
the way parallax is zeroed would make everything past the first screenful
unreachable.

### `data-sc-in`
Engine flow-reveal, fires once on entry via IntersectionObserver: opacity 0 +
`translate3d(0, 14px, 0)` → settled, `620ms var(--sc-ease-out)`. Used once, on
`.nh-trust`. Content that re-hides on scroll-up is a defect, not an effect.

### `data-sc-tilt="6"`
Pointer tilt on each ring plate face, 6° maximum, with `transform-style:
preserve-3d`.

## Reveal primitives (the page's own, in `home-runtime.js`)

### `[data-nh-flow]` — words rise and sharpen
- Each marked block is split into `span.fw` word spans carrying `--i`; inline
  markup is preserved and SVG subtrees are skipped
- `span.fw`: opacity 0, `translate3d(0, 0.45em, 0)`, `blur(6px)` → settled
- transition **820ms** `cubic-bezier(0.23, 1, 0.32, 1)` on opacity, transform
  and filter, delayed `var(--nh-flow-delay) + var(--i) * var(--nh-flow-step)`
- `data-nh-flow-step` default **42ms**, clamped to `min(step, 1100 / wordCount)`
  so no block ever exceeds ~1.1s end to end
- `data-nh-flow="block"` skips the split: the whole block moves 14px and fades in
  over **940ms**
- **Trigger:** IntersectionObserver `threshold: 0.12, rootMargin: '0px 0px -6% 0px'`,
  fires once, then unobserves. Everything waits on `document.fonts.ready` first,
  so a word never reflows mid-rise
- 64 elements page-wide

### `[data-nh-depth]` — rise out of depth
```
p       = ease(clamp01((vh*1.0 - top) / (vh*1.0 - vh*0.5)))    ease(t) = 1-(1-t)³
opacity = 0.06 + 0.94p
transform = translate3d(0, (1-p) * travel, 0) scale(0.965 + 0.035p)
```
Travel is **44px** unless `data-nh-depth-travel` overrides (70px on the
graduation photo, 110px on the studio photo). On completion the element gains
`.nh-seen` and its inline styles are cleared, so nothing is left driving it.
Five elements: three planes and the two story photographs.

### `[data-nh-wipe]` — the book cover
`span = min(rect.height, vh * 0.8) * 0.9`;
`clip-path: inset((1 - ease(p)) * 100% 0 0 0 round 6px 14px 14px 6px)`.
On completion the inline `clip-path` is cleared so the sheen can overflow again.
One element on the page.

### `[data-nh-tick]` / `[data-nh-count]` — counters
| | `data-nh-tick` | `data-nh-count` |
|---|---|---|
| Trigger | on load (hero is on screen) | first intersection |
| Delay | `data-nh-tick-delay` (200 / 320ms) | fixed 120ms |
| Duration | **2200ms** | `data-nh-count-dur` (2600ms on all four rows) |
| Easing | `1-(1-t)³` | same |
| Format | `toLocaleString('en-US')` | same |

Both render their final value server-side and reset to "0" when the animation
starts, so a reader without JS still sees the number.

## Per-act choreography

### 1 · Hero
Portrait recedes `translate3d(0, p·18px, 0) scale(1 - p·0.05)` — no fade, the
stage's own slide carries him off. Stats tick at 200/320ms; headline, sub and
CTA flow at 260 / 640 / 1050ms. The pill docks when the stage's
`getBoundingClientRect().bottom < vh × 0.62`.

### 2 · Proof
Plane depth entrance; four counters at 2600ms; row hover.

### 3 · Recognition — the peak
- Seven plates parked at `--nh-a = i × 360/7`
- `ringTargetY = -p × TURN`, `TURN = 360 × (N-1)/N = **308.57°**` — one lap minus
  a plate, so the last plate lands front and centre exactly as the act ends
- Lerp `1 - exp(-7·dt)`
- Pointer lean (fine only): `leanX = -6 - (relY - 0.5)·8`,
  `leanY = (relX - 0.5)·10`, reset to `-6, 0` on `pointerleave`
- Per-plate depth: `facing = cos(angle)`;
  `opacity = 0.18 + 0.82·clamp01((facing + 0.35)/1.35)`;
  `visibility: hidden` below `facing < -0.06` — Safari renders a preserve-3d
  child's backface even when the parent hides its own
- A plate flows its own words the moment it faces the viewer: it arrives by
  *turning*, not by scrolling, so the entry observer can miss it and leave a
  visible card blank

### 4 · Story
Three depth entrances at 44 / 70 / 110px travel.

### 5 · Rooms
Engine pans the rail; the controller staggers each item's `--nh-settle` 0 → 1
across `[0.02 + i·0.13, +0.16]` of act progress, eased `1-(1-t)³`. **Item 0 is
exempt** — it is already on screen when the act begins. The settle drives
`opacity: 0.55 → 1` and a 30px lift, inside
`@media (prefers-reduced-motion: no-preference)`.

### 6 · Book
Cover wipe (above), then the sheen overflows.

### 7 · Close
Three staggered cues (0 / 0.05 / 0.12 with widening ramps).

## The glass

| Uniform | Bound to | Easing |
|---|---|---|
| `offsetY` | `-scrollY / vh × 0.22` | `1 - exp(-7·dt)` (coarse `-5·dt`) |
| `offsetX` | `scrollY / vh × 0.03` | same |
| `intensity` | `0.22 + min(0.34, vel × 0.16)` | `1 - exp(-4·dt)` |
| `rotate` | `(ringP - 0.5) × 0.22` while the ring stage is on screen, else 0 | — |

Velocity is in viewport-heights per second and **attacks faster than it decays**:
`vel += (v - vel) × (v > vel ? 0.35 : 1 - exp(-2.2·dt))`. On coarse pointers it
is pinned to 0 — touch deltas arrive in bursts and a velocity-bound prism would
pulse. While the ring is on screen the intensity floor rises to 0.46 (fine) /
0.34 (coarse): the brightest, most refracted moment on the page.

## Hover and focus

| Element | Property | From → to | Transition |
|---|---|---|---|
| `.nh-btn` | background | `#0B72CC` → `#0A66B8` | 140ms |
| `.nh-btn` | box-shadow | `0 8px 22px -8px /0.55` → `0 12px 28px -8px /0.6` | 160ms |
| `.nh-btn:active` | transform | none → `translateY(1px) scale(0.985)` | 140ms |
| `.nh-btn--ghost` | background | `rgb(255 255 255 / 0.62)` → `/ 0.86` | 140ms |
| `.nh-link` | border-bottom-color | `rgb(11 114 204 / 0.35)` → full | 140ms |
| `.nh-reg__row` | background | transparent → `rgb(59 170 255 / 0.06)` | 160ms |
| `.nh-reg__go` | transform | none → `translate(2px, -2px)` | 160ms |
| `.nh-trust__row img` | opacity / filter | `0.72` / `grayscale(1) contrast(1.05)` → `1` / none | 160ms |
| `.nh-pill a` | background | transparent → `rgb(11 13 16 / 0.05)` | 140ms |
| `.nh-hero__links a` | background | transparent → `rgb(255 255 255 / 0.55)` | 140ms |
| `a.nh-plate__in` | box-shadow | `0 18px 40px -16px /0.35` → `0 26px 48px -16px /0.42` | 160ms |
| `.nh-social a`, `.nh-foot__terms` | colour | ink / ink-soft → `#0B72CC` | — |

Focus rings are `2px solid var(--sc-accent)` with `outline-offset` 1–3px per
context (`-2px` inside a registry row so the ring stays inside the rule).

## Keyboard

The engine centres a focused control inside its act, but a **pinned** act parks
at progress 0 when centred — where the close's cues are still shut, and where a
ring plate may be facing away. Two overrides in the controller:

- `focusin` anywhere in `#watch` → park at `top + max(offsetHeight - vh, 1) × 0.6`
- `focus` on a plate link → `top + travel × clamp01((i × 360/N) / TURN)`

both with `behavior: 'instant'`. Anything else that the browser leaves off screen
is centred after a 30ms settle.

## Reduced motion

| Behaviour | Under `prefers-reduced-motion: reduce` |
|---|---|
| `scroll-behavior` | `auto` |
| Glass | `timeScale: 0`; `glassTick` never runs |
| Word reveals | `.is-flowed` added immediately to every block |
| Counters | jump straight to the target |
| Depth / wipe | `p` forced to 1; CSS also resets `[data-nh-depth]` |
| Ring | `--nh-ring-y: 0deg`, lerp factor 1, pointer handlers never attached |
| Portrait recede | not written |
| Pill | transition dropped |
| Rail | transform zeroed, stage becomes a snap-scroll region |
| Cue rise, parallax, kinetic split | `transform: none` |
| `[data-sc-reveal]` | `clip-path: none` |

Fewer and gentler, not zero: opacity still carries the reveals, so the page stays
comprehensible.

## One inherited quirk

`scrollcraft.js`'s scroll listener runs `read(); ticking = false;` in that order,
and `read()`'s "keep going until settled" reschedule is guarded by `if
(!ticking)` — still `true` at that point. **Progress therefore advances one step
per scroll event.** Continuous human scrolling hides this completely; a single
programmatic `scrollTo()` leaves progress frozen part-way. Any automated check
must scroll in many small steps or pump `ScrollCraft.instances[0].read()` in a
loop. This is present identically on the source site — it is not a clone
defect.
