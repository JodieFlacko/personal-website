# CloseAct Specification

## Overview
- **Target file:** `<page>/CloseAct.tsx`
- **Screenshot:** `docs/design-references/www-nateherk-com-dfc5c2e7/root-8a5edab2/desktop-07-close-yend.png`
- **Interaction model:** scroll-driven (pinned stage with three staggered cues)

Act 7 · **resolve**. Pinned for 1.5 viewports, and the footer lives *inside* the
stage — so the page ends on a held frame rather than scrolling past one.

## DOM Structure

```
section#watch[data-sc-act="pin" data-sc-span="1.5"]
  div.nh-close[data-sc-stage]                    grid: 1fr auto
    div.nh-close__inner                          centred copy
      h2.sc-display[data-sc-cue="0 1 0 0"][data-nh-flow][data-nh-flow-step="90"]
      p[data-sc-cue="0 1 0 0"]        a.nh-btn.nh-btn--lg (PlayIcon 16 + text)
      p.nh-close__alt[data-sc-cue="0.05 1 0.25 0"][data-nh-flow]   … a.nh-link …
      img.nh-close__sig[data-sc-cue="0.12 1 0.3 0"]
    footer.nh-foot
      span.nh-mark  (img 24 + "Nate Herk" + i ".")
      nav.nh-social[aria-label="Social"]   a × 4
      small  "© 2026 Nate Herk™"
      a.nh-foot__terms
```

## Computed Styles (exact values from getComputedStyle)

### Act + stage
- `section#watch` — 1430×**1350px**; offsetTop 10479 (last act; document ends at 11829)
- `.nh-close.sc-stage` — 1430×900px; sticky; top 0; overflow clip;
  display grid; gridTemplateRows **826.219px 73.781px** (`1fr auto`)

### `.nh-close__inner`
- display grid; justifyContent center; alignContent center; textAlign center
- padding `0 72px`; gap **24px** (`--sc-5`)
- gridTemplateColumns 1274.58px; rows `84.2 / 102.94 / 65.16 / 84.52`

#### `h2.sc-display`
- fontSize **89.6px** (`clamp(2.4rem, 1.4rem + 5vw, 5.6rem)`); fontWeight 700
- lineHeight 84.224px (0.94); letterSpacing **-3.136px**; textWrap balance

#### `a.nh-btn.nh-btn--lg`
- fontSize 18px; fontWeight 600; padding `18.9px 30.6px`; borderRadius **14px**
- 245.31×66.94px; gap 9.9px; backgroundColor `rgb(11, 114, 204)`; colour white
- display inline-flex (it sits inside a centred `<p>`)

#### `p.nh-close__alt`
- fontSize 18px (`--sc-t-base`); colour `rgb(90, 100, 114)`; lineHeight 29.16px
- `a.nh-link` inside — colour `rgb(11, 114, 204)`; fontWeight 500;
  borderBottom `1px solid rgba(11, 114, 204, 0.35)`

#### `img.nh-close__sig`
- width **272px** (`clamp(11rem, 20vw, 17rem)`); height 60.52px (auto)
- opacity **0.9**; justifySelf center; marginTop 24px
- 800×178 intrinsic; `loading="lazy"`

### `footer.nh-foot`
- display flex; justifyContent space-between; alignItems center; flexWrap wrap; gap 24px
- padding **22.4px 72px** with `max(1.4rem, env(safe-area-inset-bottom))` at the bottom
- borderTop `1px solid rgba(11, 13, 16, 0.08)`
- backgroundColor `rgba(255, 255, 255, 0.5)`; backdropFilter `blur(10px)` *(from CSS)*
- fontSize **12.8px** (`0.8rem`); colour `rgb(90, 100, 114)`; height 73.78px
- `span.nh-mark` — fontSize 16.8px; fontWeight 700; letterSpacing -0.336px;
  colour `rgb(11, 13, 16)`; gap 9.6px; `img` **28×28 rendered from a 24×24 declaration**
- `nav.nh-social` — display flex; gap **19.2px** (`1.2rem`);
  `a` fontWeight 500; colour `rgb(11, 13, 16)`
- `small` — fontSize **10.667px** (0.8rem × 0.8333 from the `<small>` default); lineHeight 17.28px
- `a.nh-foot__terms` — fontSize 12.8px; fontWeight 500; colour `rgb(90, 100, 114)`

## States & Behaviors

### Three staggered cues (the act's whole choreography)
`data-sc-cue="from to rampIn rampOut"` — a window inside the act's own progress,
with the two ramps given as **fractions of that window** (0.3 each by default):

| Element | cue | window | ramp in | ramp out |
|---|---|---|---|---|
| `h2` | `0 1 0 0` | the whole act | none — present from the first pixel | none |
| `p` (button) | `0 1 0 0` | the whole act | none | none |
| `p.nh-close__alt` | `0.05 1 0.25 0` | p 0.05 → 1 | 25% of the window (≈ p 0.29) | none |
| `img.nh-close__sig` | `0.12 1 0.3 0` | p 0.12 → 1 | 30% of the window (≈ p 0.38) | none |

Each frame the engine writes `opacity: vis` and
`transform: translate3d(0, (1 - vis) * 2.4 * rise vh, 0)` (`rise` defaults to 1),
with a smoothstep on each ramp and a plateau at 1 between them, and flips
`pointer-events` at `vis > 0.5`. `[data-sc-cue] { opacity: 0 }` is the pre-paint
state so nothing flashes before the first `read()`. That staircase — 0, 0.05,
0.12 with widening ramps — is what makes the headline, the alt line and the
signature arrive in sequence as the act is held.

### Keyboard focus (a special case)
The engine centres a focused control inside its act, but a **pinned** act parks
at progress 0 when centred — where these cues are still shut. So the controller
intercepts `focusin` anywhere inside `#watch` and parks the page at
`top + max(offsetHeight - vh, 1) * 0.6` (`behavior: 'instant'`) instead, which is
where the cues are open.

### Word reveals
`h2` step 90ms · `p.nh-close__alt` default 42ms. The button paragraph is
cue-driven only; the signature is an image and has no words.

### Hover states
- `a.nh-btn` — background → `#0A66B8`; shadow deepens; `:active` `translateY(1px) scale(0.985)`
- `a.nh-link` — border-bottom colour → `rgb(11, 114, 204)`
- `.nh-social a` — colour `rgb(11, 13, 16)` → `rgb(11, 114, 204)`
- `.nh-foot__terms` — colour `rgb(90, 100, 114)` → `rgb(11, 114, 204)`
- focus-visible on both footer link groups: `2px solid rgb(59, 170, 255)`,
  offset 2px, radius 3px

## Per-State Content
N/A.

## Assets
- `<assets>/images/signature.png` (800×178 → 272px wide, opacity 0.9)
- `<assets>/images/logo.png` (declared 24×24, rendered 28×28 by `.nh-mark img`)
- Icon: `PlayIcon` 16px

## Text Content (verbatim)
- h2 "New YouTube videos every week."
- button "Watch on YouTube" → `https://www.youtube.com/@nateherk`
- alt line "Or **join AI Automation Society**. It's free." (the link wraps only the middle clause)
- footer mark "Nate Herk" + "."
- social: "YouTube" · "X" (`https://x.com/nateherk`) · "LinkedIn" · "Instagram"
- "© 2026 Nate Herk™"
- "Terms of Access" → `/terms-of-access`
- signature alt "Nate Herkelman's signature."

## Responsive Behavior
- **Desktop (1440px):** h2 89.6px; footer in one row, space-between.
- **Tablet (768px):** ≤860px — h2 **41.6px** (`clamp(1.9rem, 8.6vw, 2.6rem)`);
  `.nh-close__inner` gains `padding-top: 4.5rem` and drops to `gap: var(--sc-4)`
  so the heading clears the pill; signature `clamp(8rem, 34vw, 11rem)` at
  `margin-top: var(--sc-3)`; footer centres (`justify-content: center;
  text-align: center`), padding `14.4px 38.4px`, fontSize **11.84px**, social gap
  0.9rem. Act height 1536px.
- **Mobile (390px):** same branch — h2 **33.54px**, footer padding `14.4px 20px`,
  same 11.84px type. Act height 1266px. Coarse pointers replace the footer's
  frosted surface with `rgba(255, 255, 255, 0.88)`.
- **Breakpoint:** 860px. The close is a pinned stage and clips what does not
  fit, which is why the mobile rules shrink the heading rather than let it wrap.
