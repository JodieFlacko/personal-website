# RoomsAct Specification

## Overview
- **Target file:** `<page>/RoomsAct.tsx`
- **Screenshot:** `docs/design-references/www-nateherk-com-dfc5c2e7/root-8a5edab2/desktop-05-rooms-y7900.png`
- **Interaction model:** scroll-driven (pan act — vertical scroll becomes horizontal travel)

Act 5 · **presence**. A `pan` act, 3.5 viewports tall: the engine translates the
rail sideways across the act's progress while the stage stays pinned. On top of
that the controller staggers each photograph's arrival.

## DOM Structure

```
section#rooms[data-sc-act="pan" data-sc-span="3.5"]
  div.nh-rail-stage[data-sc-stage]                    sticky, flex, align-items center
    div#rail.nh-rail[data-sc-pan="0.05"]              engine translates this
      div.nh-rail__lead.nh-plate-soft
        h2.sc-display[data-nh-flow][data-nh-flow-step="80"]
        p.sc-body[data-nh-flow][data-nh-flow-delay="320"]
      figure.nh-room.nh-room--{land|wide|square|tall} × 6
        div.nh-room__frame  img
        figcaption[data-nh-flow]
      div.nh-rail__end   p[data-nh-flow]
```

`data-sc-pan="0.05"` is the lead-in the engine holds before travel begins. Photo
order and shape come from `ROOM_PHOTOS`; the shapes exist to vary the rhythm as
the rail passes.

## Computed Styles (exact values from getComputedStyle)

### Act + stage
- `section#rooms` — 1430×**3150px**; offsetTop 6435
- `.nh-rail-stage.sc-stage` — 1430×900px; sticky; top 0; overflow clip;
  display flex; alignItems center
- `div#rail.nh-rail` — **3838.36px** wide × 469.22px; display flex;
  alignItems center; gap **40px** (`clamp(1.25rem, 3vw, 2.5rem)`);
  paddingInline 72px; willChange transform;
  measured transform at act start `matrix(1, 0, 0, 1, -0.26, 0)`

### `.nh-rail__lead.nh-plate-soft`
- flex `0 0 auto`; width **416px** (`min(26rem, 74vw)`); height 252.59px
- padding **32px** (`clamp(1.2rem, 2.4vw, 2rem)` both axes); marginRight 28.8px
- backgroundColor `rgba(245, 246, 248, 0.58)`; borderRadius 16px
- boxShadow `rgba(255,255,255,0.9) 0 1px 0 inset, rgba(255,255,255,0.5) 0 0 0 1px`;
  backdropFilter `blur(12px)` *(from CSS)*
- `h2` — fontSize **60.8px** (`clamp(2rem, 1.3rem + 2.8vw, 3.8rem)`); fontWeight 700;
  lineHeight 57.152px; letterSpacing **-2.128px**
- `p.sc-body` — 18px; colour `rgb(90, 100, 114)`; marginTop 16px

### `.nh-room` shapes (measured widths at 1440)
| class | width rule | measured | aspect | `--nh-lift` | measured transform |
|---|---|---|---|---|---|
| `--land` | `clamp(20rem, 36vw, 34rem)` | **518.39px** | 16/10 → 323.98px | `6vh` | `translateY(54px)` |
| `--wide` | `clamp(22rem, 42vw, 40rem)` | **604.8px** | 3/2 → 403.19px | `-4vh` | `translateY(-6px)` * |
| `--square` | `clamp(15rem, 26vw, 24rem)` | **374.39px** | 1/1 → 374.39px | `8vh` | `translateY(102px)` * |
| `--tall` | `clamp(13rem, 22vw, 20rem)` | **316.8px** | 3/4 → 422.39px | `-6vh` | `translateY(-24px)` * |

\* the measured values fold in `--nh-settle`: the rule is
`translateY(calc(var(--nh-lift) + (1 - var(--nh-settle, 1)) * 30px))` and
`opacity: calc(0.55 + 0.45 * var(--nh-settle, 1))` — items still at settle 0 read
`opacity: 0.55` and sit 30px lower.

- `.nh-room__frame` — borderRadius **16px**; overflow hidden;
  backgroundColor `rgb(255, 255, 255)`; boxShadow `--sc-e3`
- `img` — width/height 100%; objectFit cover
- `figcaption` — display inline-block; marginTop 12.8px; padding `6.4px 11.2px`;
  borderRadius 10px; fontSize **13.12px** (`0.82rem`); colour `rgb(11, 13, 16)`;
  backgroundColor `rgba(245, 246, 248, 0.62)`;
  boxShadow `rgba(255,255,255,0.5) 0 0 0 1px`; backdropFilter `blur(10px)` *(from CSS)*

### `.nh-rail__end`
- flex `0 0 auto`; width **320px** (`min(20rem, 60vw)`); paddingLeft 28.8px
- `p` — fontSize **24px** (`--sc-t-lg`); fontWeight 500; lineHeight 33.6px (1.4)

## States & Behaviors

### Horizontal pan (engine)
- **Trigger:** the act's smoothed progress; the engine writes
  `transform: translateX(...)` on `[data-sc-pan]`.
- **Travel:** rail width (3838.36px) minus the stage width, mapped across the
  act's progress after the `0.05` lead-in.
- **State A (p = 0):** `translateX(-0.26px)` — the lead plate on screen.
- **State B (p = 1):** the rail's end block on screen (measured mid-act at
  `translateX(-2136.74px)` in the earlier verification pass).

### Per-item settle (controller)
- **Trigger:** every frame, from the same act progress.
- **Window:** item *i* runs `--nh-settle` 0 → 1 across
  `[0.02 + i*0.13, +0.16]` of act progress, eased `1-(1-t)³`.
- **Item 0 is exempt** — it is already on screen when the act begins, so it is
  pinned at settle 1.
- **Effect:** opacity `0.55 → 1` and a 30px lift, per the media query above.
  The whole behaviour lives inside `@media (prefers-reduced-motion: no-preference)`.

### Word reveals
`h2` step 80ms · lead `p` delay 320ms · each `figcaption` and the end paragraph
at the default 42ms step. Captions off-screen to the right only flow once the
rail brings them into view.

### Hover states
N/A — no room is a link and no caption has a hover treatment. The only pointer
behaviour in this act belongs to the engine's own pan.

### Reduced motion
`[data-sc-pan]` transforms are zeroed, and the stage instead becomes a real
scroll region: `overflow-x: auto; overscroll-behavior-x: contain;
scroll-snap-type: x proximity` with `scroll-snap-align: center` on each child.
A rail's travel *is* its navigation — zeroing it the way parallax is zeroed
would park the act on its first screenful and make the rest unreachable.

## Per-State Content

`ROOM_PHOTOS`, in rail order:

| # | file | intrinsic | shape | caption |
|---|---|---|---|---|
| 0 | `workless.webp` | 1448×956 | land | "Nate teaching at Workless AI." |
| 1 | `speaking-stage.webp` | 1800×1200 | wide | "Teaching the process on stage." |
| 2 | `speaking-mic.webp` | 1400×1400 | square | "Nate speaking at AfricAI." |
| 3 | `book-hand.webp` | 1050×1400 | tall | "Becoming AI Native, in hand." |
| 4 | `africai.webp` | 1800×1200 | land | "AfricAI Mastermind." |
| 5 | `montenegro.webp` | 933×1400 | tall | "Nate with friends in Montenegro." |

## Assets
The six photographs above, all under `<assets>/images/`, all `loading="lazy"`
with explicit `width`/`height` from `ROOM_PHOTOS`. No icons in this act.

## Text Content (verbatim)
- h2 "Same job in every room."
- p "On YouTube, in the community, and on stage."
- end "New YouTube videos every week, and a community that ships between them."
- alts:
  - "Nate Herk teaching a room at Workless AI, a camera recording in the foreground."
  - "Nate Herk presenting on a stage to a seated audience, slides on either side."
  - "Nate Herk speaking into a microphone at an outdoor event."
  - "Nate Herk holding up a copy of Becoming AI Native."
  - "Nate Herk with a group of attendees at AfricAI."
  - "Nate Herk with two friends on a boat in Montenegro, mountains behind them."

## Responsive Behavior
- **Desktop (1440px):** rail 3838.36px wide; act 3150px tall.
- **Tablet (768px):** ≤860px caps every shape —
  wide `min(80vw, 24rem)`, square `min(60vw, 16rem)`, tall `min(52vw, 14rem)`,
  land `min(76vw, 22rem)`. Measured rail width **2781.36px**; act 3584px.
- **Mobile (390px):** same caps at a narrower `vw` — measured rail **2254.97px**;
  act 2954px. Coarse pointers drop the backdrop blur on `.nh-rail__lead`,
  `.nh-plate-soft` (`rgba(245, 246, 248, 0.86)`) and the captions
  (`rgba(245, 246, 248, 0.88)`).
- **Breakpoint:** 860px. The lift values are `vh`-based, so they scale
  continuously rather than switching.
