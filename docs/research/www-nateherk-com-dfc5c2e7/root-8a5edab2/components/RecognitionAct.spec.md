# RecognitionAct Specification

## Overview
- **Target file:** `<page>/RecognitionAct.tsx`
- **Screenshot:** `docs/design-references/www-nateherk-com-dfc5c2e7/root-8a5edab2/desktop-03-ring-y3800.png`
- **Interaction model:** scroll-driven (pinned stage turns a 3D ring), plus pointer lean and per-plate hover/focus

Act 3 · **awe**, and the longest act on the page: pinned for 3.4 viewports.
Seven plates ride a 3D carousel; the trophy photograph sits beside the ring, not
in it, so it holds still while the plates turn around it.

## DOM Structure

```
section#recognition[data-sc-act="pin" data-sc-span="3.4"]
  div.nh-ring-stage[data-sc-stage][data-sc-verify-state="ring:<deg>"]   perspective 1500px
    div.sc-copy.nh-ring__copy[data-sc-cue="0 1 0 0.12"]
      h2.sc-display.sc-display--md[data-nh-flow][data-nh-flow-step="90"]
      p.sc-body[data-nh-flow][data-nh-flow-delay="300"]
    div.nh-ring__scene[aria-label="Awards and press"]        preserve-3d
      figure#ringCentre.nh-ring__centre    img (trophy)
      div#ring.nh-ring                                        preserve-3d
        article.nh-plate × 7                                  --nh-a = i*360/7
          a.nh-plate__in[data-sc-tilt="6"]  |  div.nh-plate__in[data-sc-tilt="6"]
            img.nh-plate__badge?            (n8n only)
            span.nh-plate__src[data-nh-flow]
            span.nh-plate__title[data-nh-flow][data-nh-flow-delay="120"]
            span.nh-plate__sub[data-nh-flow][data-nh-flow-delay="260"]
            ArrowUpRightIcon.nh-plate__go   (linked plates only)
    p.nh-ring__caption[data-sc-cue="0.06 1 0.12 0.12"][data-nh-flow]
```

A plate with an `href` renders `<a>`; one without renders `<div>` — the only
structural variation in the act. Plate order comes from `AWARD_PLATES` and
**matters**: the ring lays plates out at `index * 360 / count`.

## Computed Styles (exact values from getComputedStyle)

### Act + stage
- `section#recognition` — 1430×**3060px**; offsetTop 2151
- `.nh-ring-stage.sc-stage` — 1430×900px; sticky; top 0; overflow clip;
  **perspective: 1500px**; perspectiveOrigin `50% 46%`

### `.nh-ring__copy` (a `.sc-copy` variant)
- position: absolute; left 72px; top **108px** (`clamp(5rem, 12vh, 8rem)`); zIndex 20
- width/maxWidth **480px** (`30rem`); height 169.45px
- padding **24px 25.6px** (`clamp(1rem,2vw,1.5rem)` × `clamp(1.1rem,2.2vw,1.6rem)`)
- backgroundColor `rgba(245, 246, 248, 0.58)`; borderRadius 16px
- boxShadow `rgba(255,255,255,0.9) 0 1px 0 inset, rgba(255,255,255,0.5) 0 0 0 1px`
- backdropFilter `blur(12px)` *(from CSS)*
- `h2.sc-display--md` — fontSize **54.4px** (`--sc-t-2xl`); fontWeight 700;
  lineHeight 51.136px; letterSpacing **-1.36px** (`-0.025em`)
- `p.sc-body` — fontSize 18px; colour `rgb(90, 100, 114)`; lineHeight 29.16px;
  marginTop 12px; maxWidth 699.68px (`62ch`)

### `.nh-ring__scene`
- position: absolute; inset 0; zIndex 1; display grid; placeItems center;
  transformStyle **preserve-3d**

### `figure#ringCentre.nh-ring__centre`
- position: absolute; left 50%; top 50%; margin 0
- width/height **302.39px** (`clamp(12rem, 21vw, 21rem)`); aspectRatio 1
- transform `translate(-50%, -50%) translateY(-5vh)` → measured `matrix(1,0,0,1,-151.195,-196.195)`
- `img` — 302.39×302.39; objectFit cover; objectPosition `50% 38%`;
  borderRadius **22px**;
  boxShadow `rgba(255,255,255,0.85) 0 0 0 6px, rgba(49,68,94,0.45) 0 30px 60px -20px`

### `div#ring.nh-ring`
- position: absolute; left 50%; top 50%; **width 1px; height 1px** (a pure axis)
- transformStyle: preserve-3d
- `--nh-ring-r: clamp(18rem, 32vw, 32rem)` → **460.8px** at 1440
- transform `translateY(4vh) rotateX(var(--nh-ring-x)) rotateY(var(--nh-ring-y))`
  → measured at rest `matrix3d(…, 0.994522, -0.104528, …, 0, 36, 0, 1)` = rotateX(-6deg), translateY(36px)

### `article.nh-plate` (×7)
- position: absolute; left 0; top 0
- width **288px** (`clamp(14rem, 20vw, 19rem)`); marginLeft **-144px** (half the width)
- transform `translateY(-50%) rotateY(var(--nh-a)) translateZ(460.8px)`
- transformStyle preserve-3d; backfaceVisibility hidden
- `--nh-a` per plate: 0 / 51.43 / 102.86 / 154.29 / 205.71 / 257.14 / 308.57 deg
- measured example (plate 0, front): rect 418.58×260.33 — the projected size,
  the layout box stays 288×184

### `.nh-plate__in`
- display block; padding **20.8px 21.6px 21.6px** (`1.3rem 1.35rem 1.35rem`)
- minHeight **184px** (`11.5rem`); borderRadius **18px**
- backgroundColor `rgba(255, 255, 255, 0.62)`
- boxShadow `rgba(255,255,255,0.9) 0 1px 0 inset, rgba(255,255,255,0.8) 0 0 0 1px, rgba(49,68,94,0.35) 0 18px 40px -16px, rgba(11,13,16,0.05) 0 1px 3px`
- backdropFilter `blur(14px) saturate(1.2)` *(from CSS)*
- backfaceVisibility hidden **on the child too** — Safari does not inherit the parent's
- transition `box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1)`

### Plate text
- `.nh-plate__src` — fontSize **11.52px**; fontWeight 600; letterSpacing **1.3824px**;
  textTransform uppercase; colour `rgb(11, 114, 204)`; content box 244.81px wide
- `.nh-plate__title` — fontSize **27.2px** (`clamp(1.25rem, 1rem + 0.9vw, 1.7rem)`);
  fontWeight 700; lineHeight 28.56px (1.05); letterSpacing **-0.816px**; marginTop 14.4px
- `.nh-plate__sub` — fontSize **13.76px** (`0.86rem`); lineHeight 19.952px (1.45);
  colour `rgb(90, 100, 114)`; marginTop 9.6px
- `.nh-plate__go` — 16×16; absolute at top 17.6px / right 17.6px; colour `rgb(11, 114, 204)`
- `.nh-plate__badge` — 34×34; absolute at top 14.4px / right 16px

### `p.nh-ring__caption`
- position: absolute; right 72px; bottom **54px** (`clamp(2rem, 6vh, 4rem)`); zIndex 2
- width/maxWidth **352px** (`22rem`); textAlign right
- fontSize **15.2px** (`--sc-t-sm`); lineHeight 22.8px (1.5); colour `rgb(11, 13, 16)`
- padding `11.2px 15.2px`; borderRadius 12px; backgroundColor `rgba(245, 246, 248, 0.6)`
- boxShadow `rgba(255, 255, 255, 0.5) 0 0 0 1px`; backdropFilter `blur(10px)` *(from CSS)*

## States & Behaviors

### Ring rotation (the act's whole argument)
- **Trigger:** every controller frame, from the act's smoothed progress `p`.
- **Formula:** `ringTargetY = -p * TURN`, where `TURN = 360 * (N-1)/N = **308.57°**`
  for N = 7 — one full lap minus a plate, so the **last** plate lands front and
  centre exactly as the act ends.
- **Lerp:** `ringY += (target - ringY) * (1 - exp(-7·dt))`; written as
  `--nh-ring-y: (ringY + leanY)deg` and `--nh-ring-x: leanXdeg`.
- **State A (p = 0):** `--nh-ring-y: 0deg`, plate 0 facing.
- **State B (p = 1):** `--nh-ring-y: -308.57deg`, plate 6 facing.
- The stage mirrors the angle into `data-sc-verify-state="ring:<round(ringY)>"`.

### Per-plate depth
- `facing = cos((i*360/N + ringY + leanY) · π/180)` — 1 front, -1 back
- opacity: `0.18 + 0.82 * clamp01((facing + 0.35) / 1.35)` (measured examples at
  rest: front 1, next 0.771, third 0.257)
- `visibility: hidden` below `facing < -0.06` — Safari renders a preserve-3d
  child's backface even when the parent hides its own (measured: back plates
  report `visibility: hidden`)

### Pointer lean (fine pointers only)
- **Trigger:** `pointermove` on the stage.
- `leanTargetX = -6 - ((clientY - top)/height - 0.5) * 8` → −10° … −2°
- `leanTargetY = ((clientX - left)/width - 0.5) * 10` → −5° … +5°
- **Reset:** `pointerleave` returns to `-6, 0`; same `1 - exp(-7·dt)` lerp.
- Never registered under `prefers-reduced-motion` or on coarse pointers.

### Reveal-on-facing (why plates are not left blank)
A plate arrives by *turning*, not by scrolling, so the entry IntersectionObserver
can miss it. The controller flows a plate's words itself the first time
`facing >= -0.06` while the stage is on screen, then marks `pl.nhFlowed`.

### Keyboard focus
Focusing a plate's link scrolls the act to the progress that faces that plate:
`top + travel * clamp01((i*360/N) / TURN)`, `behavior: 'instant'`. A pinned act
cannot otherwise be scrolled into a cue by the browser.

### Cues
- copy `0 1 0 0.12` · caption `0.06 1 0.12 0.12` — engine-driven opacity and rise
  windows within the act's progress.

### Glass coupling
While this stage is on screen the shader takes `rotate = (p - 0.5) * 0.22` and
its intensity floor rises to 0.46 (fine) / 0.34 (coarse) — the brightest moment
on the page.

### Hover / focus states
- `a.nh-plate__in:hover` — boxShadow deepens to
  `…, rgba(255,255,255,0.95) 0 0 0 1px, rgba(49,68,94,0.42) 0 26px 48px -16px, …`, 160ms
- `a.nh-plate__in:focus-visible` — `outline: 2px solid rgb(59, 170, 255)`, offset 3px
- `[data-sc-tilt="6"]` — engine pointer tilt, 6° maximum, on each plate face

### Reduced motion
`--nh-ring-y` is pinned to `0deg`, the lerp factor becomes 1, and the pointer
handlers are never attached.

## Per-State Content

The seven plates, in ring order (`AWARD_PLATES`):

| # | `--nh-a` | src | title | sub | link / badge |
|---|---|---|---|---|---|
| 0 | 0° | Forbes | Featured Press | Top AI Sources for Business Owners | forbes.com → link |
| 1 | 51.43° | Skool Games | 4x Winner | Q1 to Q4 2025 | — |
| 2 | 102.86° | n8n | Expert Partner | Verified Expert | badge `n8n-expert-badge.webp` |
| 3 | 154.29° | n8n Community | 2x Community Award | 2024 and 2025 winner | — |
| 4 | 205.71° | Microsoft | Learn Creator | Official partnership | learn.microsoft.com → link |
| 5 | 257.14° | Talk AI | Amplifier Award | Winner | — |
| 6 | 308.57° | LinkedIn News | Cited Perspective | Top perspective on the AI industry | linkedin.com/news → link |

## Assets
- `<assets>/images/skool-win.webp` (1200×830 → 302.39×302.39, `object-position: 50% 38%`)
- `<assets>/images/logos/n8n-expert-badge.webp` (200×200 → 34×34, empty alt)
- Icon: `ArrowUpRightIcon` 16px / stroke 1.7 on the three linked plates

## Text Content (verbatim)
- h2 "Recognition"
- body "Awards and features from the AI automation ecosystem."
- caption "Winning the Skool Games, one of four consecutive wins for AI Automation Society."
- trophy alt "Nate Herk holding a Skool Games trophy."
- scene `aria-label="Awards and press"`
- plate text: see the table above.

## Responsive Behavior
- **Desktop (1440px):** ring radius 460.8px, plates 288px wide, trophy 302.39px,
  caption visible bottom-right. Act height 3060px.
- **Tablet (768px):** ≤860px branch — ring `translateY(8vh)`, radius
  `clamp(15rem, 70vw, 19rem)`; plates **232px** with `transform-style: flat`;
  `.nh-plate__in` padding `16px 16.8px 17.6px`, minHeight **152px**; trophy
  **160px** at `translateY(-13vh)`; copy maxWidth 22rem at `clamp(4.5rem,10vh,6rem)`;
  **caption `display: none`** (measured). Act height 3482px.
- **Mobile (390px):** same branch — plates **218.39px**, trophy **148.19px**,
  identical plate padding and min-height. The radius grows past the plate width
  on purpose: the chord `2r·sin(π/7) = 0.868r` must exceed the plate width or
  neighbours collide on a phone's radius. Coarse pointers also drop the backdrop
  blur and repaint the face as `rgba(250, 251, 253, 0.9)`. Act height 2870px.
- **Breakpoints:** 860px, plus a `max-height: 720px` companion (trophy
  `clamp(6rem,28vw,8rem)`, ring `translateY(12vh)`, copy at 3.6rem).
