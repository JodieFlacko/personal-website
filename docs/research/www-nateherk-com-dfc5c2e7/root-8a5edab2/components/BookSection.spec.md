# BookSection Specification

## Overview
- **Target file:** `<page>/BookSection.tsx`
- **Screenshot:** `docs/design-references/www-nateherk-com-dfc5c2e7/root-8a5edab2/desktop-06-book-y9950.png`
- **Interaction model:** scroll-driven (flow act — depth entrance plus a clip-path wipe)

Act 6 · **delight**. The one place on the page with a bespoke entrance: the
jacket wipes up from its own base rather than fading in.

## DOM Structure

```
section.nh-section[data-sc-act="flow"]
  div.nh-plane.nh-book[data-nh-depth]                    2-column grid, centred
    figure.nh-book__art
      span.nh-book__glow (aria-hidden)                   blue halo behind
      div.nh-book__plate[data-nh-wipe]                   the wiped element
        img                                              cover
        span.nh-book__sheen (aria-hidden)                diagonal highlight
    div.sc-stack
      p.sc-label[data-nh-flow]
      h2.sc-display[data-nh-flow][data-nh-flow-delay="120"][data-nh-flow-step="90"]
      p.sc-lede[data-nh-flow][data-nh-flow-delay="360"]
      p.sc-body[data-nh-flow][data-nh-flow-delay="520"]
      p.sc-label[data-nh-flow][data-nh-flow-delay="700"]
      ul.nh-book__cats[data-nh-flow][data-nh-flow-delay="800"]   li × 4
      p.nh-book__cta[data-nh-flow="block"][data-nh-flow-delay="1000"]
        a.nh-btn (+ ArrowUpRightIcon 14/1.8) · a.nh-link
```

`.sc-stack` is the floor's own spacing device: `> * + *` gets
`margin-top: var(--sc-4)` (16px) and any `h1/h2/h3` gets `var(--sc-7)` (48px)
instead — more space above a heading than below it, because the gap belongs to
the boundary rather than to the pair.

## Computed Styles (exact values from getComputedStyle)

### Act + plane
- `section.nh-section` — offsetTop 9585, height **894px**
- `.nh-plane.nh-book` — 1286×798.95px; padding 79.2px 72px; borderRadius 22px;
  backgroundColor `rgba(255, 255, 255, 0.8)`; same `--sc-e2` plane shadow
- grid: gridTemplateColumns **475.016px 580.594px**
  (`minmax(0,0.9fr) minmax(0,1.1fr)`); gap **86.4px**; alignItems **center**

### `figure.nh-book__art`
- width **384px** (`min(100%, 24rem)`); justifySelf center; position relative
- `.nh-book__glow` — inset `-12% -20%` → 537.59×794.3px; zIndex -1;
  backgroundImage `radial-gradient(at 50% 60%, rgba(59, 170, 255, 0.28), rgba(0, 0, 0, 0) 62%)`
- `.nh-book__plate` — 384×640.58px layout box (projected 378.46×658.88);
  borderRadius **6px 14px 14px 6px**; overflow hidden;
  transform `perspective(1200px) rotateY(10deg)`;
  boxShadow `--sc-e3` plus `rgba(255, 255, 255, 0.5) -1px 0 0 inset` (the spine highlight)
- `img` — width 100%; height auto; 880×1466 declared (1468 intrinsic)
- `.nh-book__sheen` — inset 0; pointerEvents none;
  backgroundImage `linear-gradient(105deg, rgba(0,0,0,0) 30%, rgba(255,255,255,0.22) 48%, rgba(0,0,0,0) 60%)`

### Copy column
- `p.sc-label` (×2) — fontSize **11.52px**; fontWeight 600; letterSpacing **1.3824px**;
  uppercase; colour `rgb(90, 100, 114)`
- `h2.sc-display` — fontSize **64px** (`clamp(2rem, 1.3rem + 3vw, 4rem)`);
  fontWeight 700; lineHeight 60.16px; letterSpacing **-2.24px**; marginTop **48px**
- `p.sc-lede` — fontSize 24px; fontWeight 500; lineHeight 34.56px; letterSpacing -0.48px; marginTop 16px
- `p.sc-body` — 18px; colour `rgb(90, 100, 114)`; lineHeight 29.16px; maxWidth 699.68px; marginTop 16px
- `ul.nh-book__cats` — display grid; gap **5.6px**; marginTop 12px; listStyle none
- `li` — fontSize **15.2px**; fontWeight 500; lineHeight 24.624px; paddingLeft **17.6px**;
  `::before` a 6×6px `border-radius: 50%` dot in `var(--sc-accent)` = `rgb(59, 170, 255)` at `top: 0.55em`
- `p.nh-book__cta` — marginTop 32px; display flex; gap 20px; alignItems center; flexWrap wrap
- `a.nh-btn` — fontSize 15.2px; padding `12.92px 20.52px`; borderRadius 12px; 176.66×50.44px
- `a.nh-link` — colour `rgb(11, 114, 204)`; borderBottom `1px solid rgba(11, 114, 204, 0.35)`

## States & Behaviors

### Cover wipe (`[data-nh-wipe]`)
- **Trigger:** every frame while the plate is entering; keyed to its own rect.
- **Span:** `min(height, vh * 0.8) * 0.9` — 461.22px at 1440×900
- **Formula:** `p = clamp01((vh - rect.top) / span)`, then
  `clip-path: inset((1 - ease(p)) * 100% 0 0 0 round 6px 14px 14px 6px)`
  with `ease(t) = 1-(1-t)³`.
- **State A:** `inset(100% 0 0 0 round …)` — nothing visible.
- **State B:** `inset(0% …)`, then **the inline `clip-path` is cleared** and
  `wipeDone` latches, so the sheen can overflow the plate again.
- Measured mid-wipe: `clipPath: inset(0.02% 0px 0px round 6px 14px 14px 6px)`.
- **Reduced motion:** `p` forced to 1 on the first frame.
- Only one element on the page carries `[data-nh-wipe]` — the controller
  queries `document.querySelector`, singular.

### Depth entrance
`[data-nh-depth]` on the plane, default 44px travel — identical to
`ProofSection`.

### Word reveals (a deliberate cascade)
| Element | delay | step |
|---|---|---|
| `p.sc-label` #1 | 0 | 42ms |
| `h2` | 120ms | 90ms |
| `p.sc-lede` | 360ms | 42ms |
| `p.sc-body` | 520ms | 42ms |
| `p.sc-label` #2 | 700ms | 42ms |
| `ul.nh-book__cats` | 800ms | 42ms |
| `p.nh-book__cta` | 1000ms | `="block"` |

### Hover states
- `a.nh-btn` — background `rgb(11, 114, 204)` → `#0A66B8`, shadow deepens, 140/160ms;
  `:active` `translateY(1px) scale(0.985)`
- `a.nh-link` — border-bottom colour → full `rgb(11, 114, 204)`, 140ms

## Per-State Content
N/A — one state. The four category strings come from `BOOK_CATEGORIES`.

## Assets
- `<assets>/images/book-cover.webp` (880×1468 intrinsic, declared 880×1466 → 384px wide), `loading="lazy"`
- Icon: `ArrowUpRightIcon` 14px / stroke 1.8

## Text Content (verbatim)
- label "#1 Amazon Bestseller"
- h2 "Becoming AI Native"
- lede "Use AI to get real results without the busywork."
- body "Nate's first book, now a #1 Amazon bestseller. One framework for putting AI to work, built to outlast every tool that comes after it."
- label "#1 Bestseller in"
- list: "Artificial Intelligence Expert Systems" · "Information Management" · "Office Management" · "Business Office Skills"
- "Buy on Amazon" → `https://www.amazon.com/dp/B0H84Z9CXG`
- "Leave a review" → `https://www.amazon.com/review/create-review?asin=B0H84Z9CXG`
- alt "Becoming AI Native by Nate Herk, standing hardcover."

## Responsive Behavior
- **Desktop (1440px):** 2-column, cover left at 384px, copy right.
- **Tablet (768px):** ≤1100px — one column (measured `604.406px`) and
  `.nh-book__art { width: min(70%, 18rem) }`, so the cover centres above the
  copy. Act height 1167px.
- **Mobile (390px):** same single column (measured 302px). Act height 1065px.
  The wipe span shrinks with the viewport (`min(height, vh*0.8) * 0.9`), so the
  jacket still finishes its wipe at the same point in its own travel.
- **Breakpoint:** 1100px.
