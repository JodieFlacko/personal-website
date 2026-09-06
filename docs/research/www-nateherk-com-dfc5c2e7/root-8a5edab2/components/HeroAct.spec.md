# HeroAct Specification

## Overview
- **Target file:** `<page>/HeroAct.tsx`
- **Screenshot:** `docs/design-references/www-nateherk-com-dfc5c2e7/root-8a5edab2/desktop-01-hero-scroll0.png` · clone: `clone-01-hero-scroll0.png`
- **Interaction model:** scroll-driven (pinned stage), with load-triggered counters and word reveals

Act 1 · **clarity**. A pinned stage: the section is 1.35 viewports tall and its
first child sticks while the act scrolls past. Nothing here is click-driven.

## DOM Structure

```
section#hero[data-sc-act="pin" data-sc-span="1.35"]        engine: pins the stage
  div.nh-hero[data-sc-stage][data-sc-verify-state]         sticky, 100vh, overflow clip
    div.nh-hero__scrim                                     left-to-right wash, aria-hidden
    div.nh-hero__bar[data-sc-cue="0 1 0 0"][data-sc-rise="0"]
      Link.nh-mark        img(28) + span "Nate Herk" + i "."
      div.nh-hero__links  a About · a Thoughts · a.nh-btn "Work with Me"
    div.sc-copy.nh-hero__copy[data-sc-cue="0 1 0 0"]
      ul.nh-hero__stats[data-nh-flow][data-nh-flow-delay="120"]
        li × 2 → span.nh-hero__n (span[data-nh-tick] + i "+") + small
      h1.sc-display[data-nh-flow][data-nh-flow-delay="260"][data-nh-flow-step="90"]
      p.nh-hero__sub[data-nh-flow][data-nh-flow-delay="640"]
      p.nh-hero__cta[data-nh-flow="block"][data-nh-flow-delay="1050"]
        a.nh-btn.nh-btn--lg (PlayIcon 14 + text) · a.nh-link
    figure#heroPortrait.nh-hero__portrait
      span.nh-hero__plate (aria-hidden)  +  img
```

Source order is deliberate: the scrim paints under the bar and copy but over the
glass; the portrait sits above the scrim and below the copy.

## Computed Styles (exact values from getComputedStyle)

### Act + stage
- `section#hero` — 1430×**1215px**, position relative, top of document (offsetTop 0)
- `div.nh-hero.sc-stage` — 1430×**900px**; position: sticky; top: 0; overflow: clip;
  display: grid; gridTemplateColumns: 1430px; zIndex: 1

### `.nh-hero__scrim`
- position: absolute; inset: `0 508.406px 0 0` → width **921.59px** (`min(64vw, 60rem)`), height 900px
- backgroundImage: `linear-gradient(to right, rgba(245, 246, 248, 0.72), rgba(245, 246, 248, 0.45) 55%, rgba(0, 0, 0, 0))`
- zIndex: 1; pointerEvents: none

### `.nh-hero__bar`
- position: absolute; inset: `0 0 804.672px`; zIndex: 3
- padding: **28px 72px** (`clamp(1rem, 2.4vw, 1.75rem)` × `--sc-gutter`)
- display: flex; justifyContent: space-between; alignItems: center
- height: 95.33px

#### `a.nh-mark`
- fontSize: **16.8px** (`1.05rem`); fontWeight: 700; lineHeight: 27.216px; letterSpacing: **-0.336px**
- display: flex; alignItems: center; gap: 9.6px; width 120.77px; height 28px
- `img` 28×28 · `i` colour `rgb(59, 170, 255)`

#### `.nh-hero__links > a:not(.nh-btn)`
- fontSize: **14.4px** (`0.9rem`); fontWeight: 500; lineHeight: 23.328px
- padding: `8px 12.8px`; borderRadius: 999px; height 39.33px
- transition: `background-color 140ms cubic-bezier(0.23, 1, 0.32, 1)`

#### `.nh-hero__links .nh-btn`
- fontSize: **13.44px** (`0.84rem`); fontWeight: 600; letterSpacing: -0.0672px
- backgroundColor: `rgb(11, 114, 204)`; color: `rgb(255, 255, 255)`
- padding: `8.064px 14.112px` (`0.6em 1.05em`); marginLeft: 6.4px; borderRadius: 999px
- width 116.73px; height 37.89px; gap 7.392px
- boxShadow: `rgba(255,255,255,0.25) 0 1px 0 inset, rgba(11,114,204,0.55) 0 8px 22px -8px, rgba(11,13,16,0.12) 0 1px 2px`

### `.sc-copy.nh-hero__copy`
- position: absolute; left/right: 72px; top: **450px** (`50%`); translate: `0 -46%`
- width/maxWidth: **704px** (`min(44rem, 80vw)`); height 485.73px; zIndex: **20**

#### `ul.nh-hero__stats`
- display: flex; flexWrap: wrap; gap: **40px**; margin: `0 0 24px`; listStyle: none
- `li` — display: grid; gap: 2.4px
- `span.nh-hero__n` — fontSize: **29.6px** (`clamp(1.25rem, 1rem + 1.1vw, 1.85rem)`);
  fontWeight 700; lineHeight 29.6px (1); letterSpacing **-0.888px**; fontVariantNumeric: tabular-nums
- `i` ("+") — colour `rgb(59, 170, 255)`
- `small` — fontSize: **12.8px** (`0.8rem`); fontWeight: 500; colour `rgb(90, 100, 114)`; lineHeight 20.736px

#### `h1.sc-display`
- fontSize: **105.6px** (`clamp(2.7rem, 1.6rem + 6vw, 6.6rem)`)
- fontWeight: 700; lineHeight: **99.264px** (0.94); letterSpacing: **-3.696px** (-0.035em)
- maxWidth: 686.77px (`10ch`); textWrap: balance; margin 0
- `.nh-em` ("easy") — colour `rgb(11, 114, 204)`

#### `p.nh-hero__sub`
- fontSize: **24px** (`--sc-t-lg`); fontWeight: **450**; lineHeight: 34.8px (1.45)
- colour: **`rgb(42, 47, 58)`** (`#2A2F3A` — a one-off, not `--sc-ink`)
- marginTop: 24px; maxWidth: 512.39px (`34ch`)

#### `p.nh-hero__cta`
- marginTop: 32px; display: flex; alignItems: center; gap: **20px**; flexWrap: wrap
- `a.nh-btn.nh-btn--lg` — fontSize 18px (`--sc-t-base`); padding `18.9px 30.6px` (`1.05em 1.7em`);
  borderRadius **14px**; width 243.31px; height 66.94px; gap 9.9px
- `a.nh-link` — colour `rgb(11, 114, 204)`; fontWeight 500;
  borderBottom `1px solid rgba(11, 114, 204, 0.35)`; transition `border-color 140ms`

### `figure#heroPortrait.nh-hero__portrait`
- position: absolute; right: **86.4px** (`clamp(1rem, 6vw, 7rem)`); bottom: 0; zIndex: 2
- width: **432px** (`clamp(16rem, 30vw, 30rem)`); height: **756px** (`min(84vh, 84svh)`)
- display: flex; alignItems: flex-end; justifyContent: center; pointerEvents: none
- `img` — 432×756 rendered from 938×1500; objectFit: contain; objectPosition: `50% 100%`;
  maskImage `linear-gradient(rgb(0,0,0) 82%, rgba(0,0,0,0) 100%)`;
  filter `drop-shadow(rgba(20, 40, 70, 0.22) 0 30px 40px)`; `fetchPriority="high"`
- `span.nh-hero__plate` — inset `8% -8% -2% -8%` → 501.09×710.64px; zIndex: -1;
  borderRadius `999px 999px 26px 26px`;
  backgroundImage `radial-gradient(at 50% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.35) 60%, rgba(0,0,0,0) 80%)`

## States & Behaviors

### Portrait recede (scroll-driven)
- **Trigger:** every controller frame, keyed to the act's smoothed progress `p`.
- **State A (p = 0):** `transform: none`
- **State B (p = 1):** `translate3d(0, 18px, 0) scale(0.95)`
- **Formula:** `translate3d(0, p*18px, 0) scale(1 - p*0.05)`; no fade — the
  stage's own slide carries him off.
- **Implementation:** inline style written by `heroTick()`, skipped entirely
  under `prefers-reduced-motion`. The stage also mirrors progress into
  `data-sc-verify-state="hero:<p*100>"`.

### Nav handoff
- **Trigger:** `heroStage.getBoundingClientRect().bottom < innerHeight * 0.62`
- **Effect:** `.nh-pill` gains `.is-docked` — see `SiteNavPill.spec.md`.

### Counters (load, not intersection)
- `[data-nh-tick="950000" data-nh-tick-delay="200"]` and
  `[data-nh-tick="450000" data-nh-tick-delay="320"]`
- **Duration:** 2200ms · **Easing:** `1-(1-t)³` · **Start:** immediately after
  `document.fonts.ready`, since the hero is on screen at load.
- Values render server-side as "950,000" / "450,000", are reset to "0" when the
  animation starts, and format with `toLocaleString('en-US')`. Under reduced
  motion they jump straight to the target.

### Word reveals
| Block | delay | step | words |
|---|---|---|---|
| `ul.nh-hero__stats` | 120ms | 42ms (default) | per-word |
| `h1` | 260ms | 90ms | 6 |
| `p.nh-hero__sub` | 640ms | 42ms | 14 |
| `p.nh-hero__cta` | 1050ms | — | `="block"`, settles as one piece |

- **Per-word:** `span.fw` at opacity 0, `translate3d(0, 0.45em, 0)`, `blur(6px)`
  → opacity 1, no transform, no filter.
  transition `820ms cubic-bezier(0.23, 1, 0.32, 1)`, delay
  `var(--nh-flow-delay) + var(--i) * var(--nh-flow-step)`.
- **Block:** opacity 0 + `translate3d(0, 14px, 0)` → settled, `940ms`.
- **Step clamp:** `min(step, 1100 / wordCount)` ms, so no block exceeds ~1.1s.
- **Trigger:** IntersectionObserver `threshold 0.12, rootMargin '0px 0px -6% 0px'`,
  fires once, then unobserves.

### Cues
Both the bar and the copy carry `data-sc-cue="0 1 0 0"`, read by the engine as
`from to rampIn rampOut` where the ramps are **fractions of the window**: a
window of the act's whole progress with **no ramp at either end**, so both
blocks are simply present from the first pixel and never fade out. The bar also
carries `data-sc-rise="0"`, which zeroes the cue's vertical travel
(`translate3d(0, (1 - vis) * 2.4 * rise vh, 0)`); the copy keeps the default
rise of 1, i.e. 2.4vh. `pointer-events` flips to `auto` once opacity passes 0.5.

### Hover states
- `.nh-hero__links > a:not(.nh-btn)` — background transparent → `rgb(255 255 255 / 0.55)`, 140ms
- `.nh-btn` — background `rgb(11, 114, 204)` → `#0A66B8`; shadow deepens to
  `0 12px 28px -8px rgb(11 114 204 / 0.6)`; `:active` adds `translateY(1px) scale(0.985)`
- `.nh-link` — border-bottom colour `rgba(11,114,204,0.35)` → `rgb(11, 114, 204)`, 140ms

## Per-State Content
N/A — a single state.

## Assets
- `<assets>/images/logo.png` (512×512 → 28×28)
- `<assets>/images/portrait-speaking.webp` (938×1500 → 432×756, `fetchPriority="high"`, not lazy)
- Icons: `PlayIcon` at 14px

## Text Content (verbatim)
- "Nate Herk" + "." · "About" · "Thoughts" · "Work with Me"
- "950,000" / "+" / "YouTube subscribers"
- "450,000" / "+" / "AI Automation Society members"
- "AI automation made **easy**."
- "I help people master AI agents, build automations, and turn their skills into income."
- "Watch on YouTube" → `https://www.youtube.com/@nateherk`
- "Join AI Automation Society" → `https://www.skool.com/ai-automation-society`
- `aria-label="Audience"` on the stats list; portrait alt "Nate Herk speaking into a microphone."

## Responsive Behavior
- **Desktop (1440px):** copy left at the gutter, portrait right; h1 105.6px.
- **Tablet (768px):** **already the stacked branch** — 768 is below the 860px
  threshold, so the copy is centred (measured 544×323.8 at x 107, `text-align:
  center`) and the portrait sits above it (272×450.55 at x 283, y 109). h1
  **44.03px** = `--sc-t-2xl` at this width. Stage 1024px; act height 1382px.
- **Mobile (390px):** the same ≤860px branch, one step further down the fluid
  ramp —
  - `.nh-hero__copy` re-anchors: `inset-inline: auto; left: 50%; translate: -50% 0;`
    `bottom: clamp(2.5rem, 9vh, 6rem)`; width `min(34rem, 90vw)`; `text-align: center`
    (measured 351×347.69 at x 20 on mobile, 544×323.8 at x 107 on tablet).
    **`inset-inline` must come before `left`** or the engine's `.sc-copy`
    shorthand pins the block to the right gutter.
  - h1 **34.96px** (`--sc-t-2xl`), `max-width: 11ch`, centred
  - portrait moves above the copy: `left: 50%; translate: -50% 0; top: 9svh;`
    `width: clamp(12rem, 50vw, 17rem)`; `height: 44svh`; `z-index: 0`;
    mask shortened to `62% → 92%` (measured 195×371.36 at x 138, y 92)
  - scrim becomes a full-width bottom band (`height: 68%`) *above* the portrait
  - stats forced to one row (`flex-wrap: nowrap`, gap 1.5rem, `.nh-hero__n` 1.2rem,
    `small` 0.68rem `white-space: nowrap`)
  - `.nh-hero__links > a:not(.nh-btn)` display none — only the button survives
  - Under `max-height: 720px` as well: portrait 36svh at 11svh, h1 `clamp(1.9rem, 8vw, 2.4rem)`,
    copy bottom `clamp(1.5rem, 5vh, 3rem)`, scrim 76%.
- **Breakpoints:** 860px, plus a 720px-height companion query.
