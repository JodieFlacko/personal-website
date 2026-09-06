# StorySection Specification

## Overview
- **Target file:** `<page>/StorySection.tsx`
- **Screenshot:** `docs/design-references/www-nateherk-com-dfc5c2e7/root-8a5edab2/desktop-04-story-y5900.png`
- **Interaction model:** scroll-driven (flow act — three nested depth entrances at different rates)

Act 4 · **intimacy**. A flow act: prose on the left, two overlapping photographs
on the right. The plane and each photograph carry their own `[data-nh-depth]`,
with per-element travel, so they rise out of depth at different rates.

## DOM Structure

```
section.nh-section[data-sc-act="flow"]
  div.nh-plane.nh-story[data-nh-depth]                     2-column grid
    div
      h2.sc-display[data-nh-flow][data-nh-flow-step="60"]
      div.nh-story__text   p × 3 [data-nh-flow]
      p.nh-story__more[data-nh-flow="block"]
        a.nh-btn.nh-btn--ghost  "Read the full story" + ArrowRightIcon 14/1.8
    div.nh-story__photos
      figure.nh-ph.nh-ph--grad[data-nh-depth][data-nh-depth-travel="70"]    img + figcaption
      figure.nh-ph.nh-ph--office[data-nh-depth][data-nh-depth-travel="110"] img + figcaption
```

## Computed Styles (exact values from getComputedStyle)

### Act + plane
- `section.nh-section` — offsetTop 5211, height **1224px**;
  padding-block `clamp(1.5rem, 4vw, 3rem)` → 48px
- `.nh-plane.nh-story` — 1286×1127.75px; padding **79.2px 72px**;
  backgroundColor `rgba(255, 255, 255, 0.8)`; borderRadius 22px;
  boxShadow `rgba(255,255,255,0.9) 0 1px 0 inset, rgba(255,255,255,0.65) 0 0 0 1px, rgba(49,68,94,0.07) 0 2px 4px, rgba(49,68,94,0.14) 0 12px 28px -8px`
- grid: gridTemplateColumns **564.625px 490.969px** (`minmax(0,1.15fr) minmax(0,1fr)`);
  gap **86.4px** (`clamp(2rem, 6vw, 6rem)`); alignItems start

### Prose column
- `h2.sc-display` — fontSize **56.64px** (`clamp(1.9rem, 1.2rem + 2.6vw, 3.6rem)`);
  fontWeight 700; lineHeight 53.2416px (0.94); letterSpacing **-1.9824px**;
  maxWidth 662.91px (`18ch`); textWrap balance; height 212.94px
- `.nh-story__text` — display grid; gap **24px**; marginTop 32px
- `.nh-story__text p` — fontSize **24px** (`--sc-t-lg`); fontWeight **450**;
  lineHeight **36px** (1.5); colour `rgb(11, 13, 16)`; maxWidth 663.09px (`44ch`);
  each 144px tall (4 lines)
- `p.nh-story__more` — marginTop 32px
- `a.nh-btn--ghost` — fontSize **15.2px**; fontWeight 600; letterSpacing -0.076px;
  padding `12.92px 20.52px`; borderRadius 12px; width 194.69px; height 50.44px; gap 8.36px;
  backgroundColor `rgba(255, 255, 255, 0.62)`; colour `rgb(11, 13, 16)`;
  boxShadow `rgba(255,255,255,0.9) 0 1px 0 inset, rgba(11,13,16,0.1) 0 0 0 1px, rgba(49,68,94,0.25) 0 6px 18px -8px`;
  backdropFilter `blur(10px)` *(from CSS)*

### Photo column
- `.nh-story__photos` — position relative; **minHeight 544px** (`34rem`); width 490.97px
- `.nh-ph` — position absolute; margin 0; borderRadius **16px**; overflow hidden;
  backgroundColor `rgb(255, 255, 255)`;
  boxShadow `--sc-e3` = `rgba(49,68,94,0.08) 0 4px 10px, rgba(49,68,94,0.2) 0 26px 56px -14px, rgba(49,68,94,0.18) 0 60px 110px -40px`
- `.nh-ph--grad` — left 0; top 0; width **56%** → 274.94px; aspectRatio **3/4** → 366.58px; zIndex 1
- `.nh-ph--office` — right 0; top **34%** → 184.95px; width **66%** → 324.03px;
  aspectRatio **4/3** → 243.02px; zIndex 2 (overlaps the graduation shot)
- `img` — width/height 100%; objectFit cover
- `figcaption` — absolute, full width at the bottom; padding `11.2px 14.4px`;
  fontSize **11.84px** (`0.74rem`); colour `rgb(255, 255, 255)`; letterSpacing 0.1184px;
  backgroundImage `linear-gradient(to top, rgba(11, 13, 16, 0.62), rgba(0, 0, 0, 0))`

## States & Behaviors

### Three depth entrances at different rates
Same mechanism as `ProofSection` (`opacity 0.06 → 1`,
`translate3d(0, travel → 0) scale(0.965 → 1)`, `ease(t) = 1-(1-t)³`, across the
element's own travel from viewport bottom to 50% height), but with three
different travels, which is what makes the group arrive in parts:

| Element | travel |
|---|---|
| `.nh-plane.nh-story` | 44px (default) |
| `.nh-ph--grad` | **70px** |
| `.nh-ph--office` | **110px** |

Each clears its inline styles and gains `.nh-seen` on completion. Measured
mid-entrance example on the office photo: `opacity: 0.993`,
`transform: matrix(0.9997, 0, 0, 0.9997, 0, 0.8)`.

### Word reveals
`h2` step **60ms** (its 13 words are clamped to `min(60, 1100/13) = 60ms`);
the three paragraphs and both figcaptions use the default 42ms step;
`p.nh-story__more` is `[data-nh-flow="block"]` and settles as one piece
(940ms).

### Hover states
- `.nh-btn--ghost` — background `rgba(255,255,255,0.62)` → `rgba(255,255,255,0.86)`;
  ring `rgb(11 13 16 / 0.10)` → `rgb(11 13 16 / 0.18)`; shadow to `0 8px 22px -8px`;
  transitions 140/160ms `cubic-bezier(0.23, 1, 0.32, 1)`
- `:active` — `translateY(1px) scale(0.985)`

### Unused device
`[data-nh-words] .w { opacity: 0.16 → 1 }` exists in `home.css` (a per-word
reading highlight) but no element on this page carries `data-nh-words`. Ported
because the stylesheet is verbatim; not a gap.

## Per-State Content
N/A.

## Assets
- `<assets>/images/grad.webp` (880×1320 intrinsic, declared 480×720 → 274.94×366.58)
- `<assets>/images/office.webp` (1600×900 → 324.03×243.02)
- Icon: `ArrowRightIcon` 14px / stroke 1.8

Both images `loading="lazy"`.

## Text Content (verbatim)
- h2 "I didn't come from a technical background, and you don't need to either."
- p1 "Nate Herkelman (yes, that is his full name) is an AI automation creator and educator. He graduated from the University of Iowa with a double major in Business Analytics and Marketing."
- p2 "After working as a Business Intelligence Analyst at Goldman Sachs, he transitioned out of the corporate world in November 2024 to build his own AI automation agency and education brand."
- p3 "Today, he teaches people how to master AI agents, build automations, and turn those skills into real income while leading one of the largest AI automation communities in the world."
- button "Read the full story" → `/about`
- captions "University of Iowa" · "Nate's YouTube studio"
- alts: "Nate Herkelman in cap and gown outside the Old Capitol at the University of Iowa." · "Nate Herk in his YouTube studio, an AIS neon sign behind him."

## Responsive Behavior
- **Desktop (1440px):** 2-column, photos overlapping in a 544px-tall well.
- **Tablet (768px):** ≤1100px — `.nh-story` becomes one column (measured
  `grid-template-columns: 604.406px`), and `.nh-story__photos` takes
  `min-height: 28rem; max-width: 34rem`. Act height 1347px.
- **Mobile (390px):** same single column (measured 302px) with
  `min-height: 22rem` from the ≤860px rule. Act height 1505px.
- **Breakpoints:** 1100px (column collapse), 860px (photo well height).
