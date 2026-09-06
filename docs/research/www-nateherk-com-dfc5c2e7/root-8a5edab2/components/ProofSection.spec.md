# ProofSection Specification

## Overview
- **Target file:** `<page>/ProofSection.tsx`
- **Screenshot:** `docs/design-references/www-nateherk-com-dfc5c2e7/root-8a5edab2/desktop-02-proof-y1500.png` · clone: `clone-02-proof-y1500.png`
- **Interaction model:** scroll-driven (flow act — reveals and counters on first intersection), plus row hover

Act 2 · **confidence**. The first plane in front of the glass. Not pinned: it
scrolls normally and the engine only tracks its progress for the depth
entrance.

## DOM Structure

```
section.nh-section.nh-section--first[data-sc-act="flow"]
  div.nh-plane[data-nh-depth]
    div.nh-proof__head
      h2.sc-display.sc-display--lg[data-nh-flow][data-nh-flow-step="80"]
      p.sc-lede[data-nh-flow][data-nh-flow-delay="240"]
    div.nh-reg
      a.nh-reg__row × 4                       whole row is one outbound link
        span.nh-reg__n  (span[data-nh-count][data-nh-count-dur="2600"] + i "+")
        span.nh-reg__k[data-nh-flow]
        span.nh-reg__d[data-nh-flow][data-nh-flow-delay="160"]
        span.nh-reg__go (ArrowUpRightIcon 16 / 1.7)
    div.nh-trust[data-sc-in]
      p.sc-label[data-nh-flow]
      div.nh-trust__row  img × 7
```

Rows come from `REGISTRY_ROWS` and logos from `TRUST_LOGOS` in
`<page>/content.ts`.

## Computed Styles (exact values from getComputedStyle)

### Act
- `section.nh-section--first` — 1430×**936.02px**; offsetTop 1215;
  padding `32px 0 48px` (`clamp(1rem, 3vw, 2rem)` top / `clamp(1.5rem, 4vw, 3rem)` bottom)

### `.nh-plane`
- width: **1286px** (`min(100% - 2*72px, 82rem)`); marginInline: 72px (auto-centred)
- padding: **79.2px 72px** (`clamp(2.5rem, 5.5vw, 5.5rem)` × `clamp(1.5rem, 5vw, 5rem)`)
- backgroundColor: `rgba(255, 255, 255, 0.8)`; borderRadius: **22px** (`--sc-r-lg`)
- boxShadow: `rgba(255,255,255,0.9) 0 1px 0 inset, rgba(255,255,255,0.65) 0 0 0 1px, rgba(49,68,94,0.07) 0 2px 4px, rgba(49,68,94,0.14) 0 12px 28px -8px`
- position: relative; height 856.02px

### `.nh-proof__head`
- display: grid; gridTemplateColumns: **492.906px 591.5px** (`minmax(0,1fr) minmax(0,1.2fr)`);
  gap **57.6px** (`clamp(1.5rem, 4vw, 4rem)`); alignItems: end
- `h2.sc-display--lg` — fontSize **80px** (`--sc-t-3xl`); fontWeight 700;
  lineHeight 75.2px (0.94); letterSpacing **-2.8px**; textWrap balance
- `p.sc-lede` — fontSize **24px**; fontWeight 500; lineHeight 34.56px (1.44);
  letterSpacing -0.48px (`-0.02em`); maxWidth 578.46px (`38ch`); justifySelf end

### `.nh-reg`
- marginTop: **56px** (`clamp(2rem, 4vw, 3.5rem)`); borderTop `1px solid rgba(11, 13, 16, 0.1)`

### `a.nh-reg__row` (×4, identical)
- display: grid; gridTemplateColumns: **236.5px 275.922px 525.578px 16px**
  (`minmax(8ch,0.9fr) minmax(0,1.05fr) minmax(0,2fr) auto`); gap 24px; alignItems: baseline
- padding: **22.4px 8px** (`clamp(1rem, 2vw, 1.4rem)` × `0.5rem`); borderRadius 10px
- borderBottom: `1px solid rgba(11, 13, 16, 0.1)`; height 90.41px
- colour `rgb(11, 13, 16)`; textDecoration none; cursor pointer
- transition: `background-color 160ms cubic-bezier(0.23, 1, 0.32, 1)`

#### `.nh-reg__n`
- fontSize: **43.2px** (`clamp(1.6rem, 1.1rem + 2vw, 2.7rem)`); fontWeight 700
- lineHeight 43.2px (1); letterSpacing **-1.296px**; fontVariantNumeric: tabular-nums
- `i` ("+") colour `rgb(59, 170, 255)`

#### `.nh-reg__k` / `.nh-reg__d`
- both fontSize **15.2px** (`--sc-t-sm`)
- `__k` fontWeight 600, lineHeight 24.624px
- `__d` colour `rgb(90, 100, 114)`, lineHeight 22.8px (1.5)

#### `.nh-reg__go`
- 16×16; colour `rgb(11, 114, 204)`; display inline-flex
- transition `transform 160ms cubic-bezier(0.23, 1, 0.32, 1)`

### `.nh-trust`
- marginTop: 56px
- `p.sc-label` — fontSize **11.52px** (`0.72rem`); fontWeight 600;
  letterSpacing **1.3824px** (`0.12em`); textTransform uppercase; colour `rgb(90, 100, 114)`
- `.nh-trust__row` — display flex; flexWrap wrap; alignItems center;
  gap **48px** (`clamp(1.4rem, 3.4vw, 3rem)`); marginTop 24px
- `img` — height **22px**, width auto, opacity **0.72**,
  filter `grayscale(1) contrast(1.05)`,
  transition `opacity 160ms …, filter 160ms …`
- `img.is-tall` — height **30px** (Skool 30×30, LinkedIn 48×30)
- measured widths: Microsoft 103.03, n8n 55, Skool 30, Apify 83.22, Forbes 83.95,
  LinkedIn 48, Hostinger 39.22

## States & Behaviors

### Depth entrance (`[data-nh-depth]` on the plane)
- **Trigger:** every frame while the element is between the viewport bottom and 50% height.
- **State A:** opacity 0.06; `translate3d(0, 44px, 0) scale(0.965)`
- **State B:** opacity 1; transform none — then `.nh-seen` is added and the
  inline styles are cleared so nothing is left driving the element.
- **Formula:** `p = ease(clamp01((vh*1.0 - top) / (vh*1.0 - vh*0.5)))`,
  `ease(t) = 1-(1-t)³`; opacity `0.06 + 0.94p`, translateY `(1-p)*44px`,
  scale `0.965 + 0.035p`. Travel is 44px unless `data-nh-depth-travel` overrides.
- **Reduced motion:** `p` forced to 1; the CSS also resets `[data-nh-depth]` to
  opacity 1 / no transform.

### Registry counters
- **Trigger:** first intersection (`threshold 0.12, rootMargin '0px 0px -6% 0px'`), then unobserved.
- **Duration:** `data-nh-count-dur="2600"` ms after a fixed **120ms** delay; easing `1-(1-t)³`.
- **Targets:** 950000 · 450000 · 3500 · 60000, formatted `toLocaleString('en-US')`.
- Server-rendered as the final string; set to "0" the moment they are observed.

### Word reveals
- `h2` step 80ms · `p.sc-lede` delay 240ms · `.nh-reg__k` default 42ms ·
  `.nh-reg__d` delay 160ms · `.sc-label` default. Same 820ms per-word transition
  as everywhere else.

### `[data-sc-in]` on `.nh-trust`
Engine flow-reveal: opacity 0 + `translate3d(0, 14px, 0)` → settled, transition
`620ms cubic-bezier(0.23, 1, 0.32, 1)`, class `.sc-in` added once.

### Hover states
- **Row:** backgroundColor transparent → `rgb(59 170 255 / 0.06)`, 160ms
- **Row arrow:** `transform: none` → `translate(2px, -2px)`, 160ms
- **Logo:** opacity `0.72` → `1`, filter `grayscale(1) contrast(1.05)` → `none`, 160ms
- **Row focus:** `outline: 2px solid rgb(59, 170, 255)`, `outline-offset: -2px`

## Per-State Content
N/A — one state; four rows of data.

## Assets
`<assets>/images/logos/` — `microsoft.webp` (562×120), `n8n.webp` (300×120),
`skool.webp` (120×120, `.is-tall`), `apify.webp` (454×120), `forbes.webp`
(458×120), `linkedin.webp` (192×120, `.is-tall`), `hostinger.webp` (214×120).
All `loading="lazy"`. Icon: `ArrowUpRightIcon` 16px / stroke 1.7.

## Text Content (verbatim)
- h2 "What I'm up to"
- lede "Building in public across platforms. Here's where to find me."
- Rows (number · label · description · href):
  - 950,000+ · "YouTube subscribers" · "Weekly tutorials on n8n and building an AI automation business." · youtube.com/@nateherk
  - 450,000+ · "AI Automation Society members" · "Join the free community and start learning AI automation today." · skool.com/ai-automation-society
  - 3,500+ · "Society Plus members" · "Premium community with curriculum, templates, and weekly support." · skool.com/ai-automation-society-plus/about
  - 60,000+ · "LinkedIn followers" · "Connect with Nate professionally and see his career journey." · linkedin.com/in/nateherkelman/
- label "Trusted by and featured in"
- logo alts: Microsoft · n8n · Skool · Apify · Forbes · LinkedIn · Hostinger

## Responsive Behavior
- **Desktop (1440px):** head is a 2-column grid, lede right-aligned; rows are
  4-column; act height 936px.
- **Tablet (768px):** both branches are already active. ≤1100px collapses
  `.nh-proof__head` to one column and moves the lede to `justify-self: start`;
  ≤860px re-cuts the row to `minmax(7ch, auto) 1fr auto` with `.nh-reg__d`
  spanning `1 / -1` on its own line — measured tracks
  `149.641px 390.766px 0px` (the third is the `auto` arrow column, which the
  16px icon fills). Act height 1044px.
- **Mobile (390px):** same two branches, narrower tracks — measured
  `116.312px 121.688px 0px`. Gutter falls to 20px and plane padding to its
  `clamp()` floor. Act height 1226px.
- **Breakpoints:** 1100px (head), 860px (rows).
