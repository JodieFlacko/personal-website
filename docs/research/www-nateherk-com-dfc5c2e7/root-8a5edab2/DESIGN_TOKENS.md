# Design Tokens — nateherk.com `/`

The source ships its design system in two layers and the clone ports both
verbatim:

| Layer | File | Role |
|---|---|---|
| Floor | `src/styles/sites/<site>/<page>/scrollcraft.css` | colour roles, type ramp, spacing scale, elevation, motion, plus the engine's device styles |
| Brand | `src/styles/sites/<site>/<page>/home.css` | Nate Herk's overrides (12 values) and every page-specific class |
| Font bridge | `src/styles/sites/<site>/<page>/fonts.css` | re-points the three family tokens at `next/font`'s generated family |

`home.css` overrides exactly six colour roles, three families, the two hairlines,
the shadow set and two radii. Everything else below is the floor's.

Values are `getComputedStyle` readings at **1440×900** (content width 1430) with
the 768 and 390 columns measured the same way. Anything fluid is a `clamp()`, so
the middle column is a real resolved value, not an interpolation.

## Colour

| Token | Value | Computed | Used for |
|---|---|---|---|
| `--sc-canvas` | `#F5F6F8` | `rgb(245, 246, 248)` | page ground (`html`) |
| `--sc-surface` | `#FFFFFF` | `rgb(255, 255, 255)` | raised surfaces |
| `--sc-ink` | `#0B0D10` | `rgb(11, 13, 16)` | primary text |
| `--sc-ink-soft` | `#5A6472` | `rgb(90, 100, 114)` | secondary text |
| `--sc-accent` | `#3BAAFF` | `rgb(59, 170, 255)` | the "+" glyphs, list bullets, focus rings, progress tail, selection |
| `--sc-accent-ink` | `#FFFFFF` | | text on the accent |
| `--nh-blue-deep` | `#0B72CC` | `rgb(11, 114, 204)` | buttons, links, `.nh-em`, plate sources |
| `--nh-blue-tint` | `#E4F1FD` | | declared; unused on this page |
| `--sc-hairline` | `rgb(11 13 16 / 0.10)` | | registry rules, ghost-button ring |
| `--sc-hairline-strong` | `rgb(11 13 16 / 0.18)` | | ghost-button hover ring |

One-off colours that are **not** tokens, and are correct that way:

- `#2A2F3A` (`rgb(42, 47, 58)`) — `.nh-hero__sub` only
- `rgba(11, 13, 16, 0.08)` — the footer's top rule (lighter than `--sc-hairline`)
- The glass palette `['#EEF3F9','#F9FBFD','#CCE6FF','#3BAAFF']` — shader uniforms, not CSS

> Why two blues: white type needs 4.5:1 on a fill and `#3BAAFF` gives 2.6.
> Buttons and links take `--nh-blue-deep`; marks and light take the brand stop.

## Typography

Family: **Inter**, variable, optical-size axis — the source loads
`Inter:opsz,wght@14..32,400..800` from Google Fonts; the clone loads the same
face through `next/font/google` with `axes: ["opsz"]`. All three family tokens
(`--sc-font-display`, `--sc-font-text`, `--sc-font-mono`) point at it: this page
uses one family for everything, including the label style that the floor sets in
mono.

Computed `font-family` on `<body>`: `Inter, "Inter Fallback", system-ui, sans-serif`.

### Ramp (resolved)

| Token | Declared | 1440 | 768 | 390 |
|---|---|---|---|---|
| `--sc-t-xs` | `clamp(0.75rem, 0.72rem + 0.15vw, 0.82rem)` | **13.11px** | 12.67px | 12.09px |
| `--sc-t-sm` | `clamp(0.875rem, 0.84rem + 0.18vw, 0.95rem)` | **15.19px** | 14.81px | 14.14px |
| `--sc-t-base` | `clamp(1rem, 0.96rem + 0.22vw, 1.125rem)` | **18px** | 17.05px | 16.20px |
| `--sc-t-lg` | `clamp(1.2rem, 1.1rem + 0.5vw, 1.5rem)` | **24px** | 21.44px | 19.55px |
| `--sc-t-xl` | `clamp(1.6rem, 1.35rem + 1.2vw, 2.25rem)` | **36px** | 30.81px | 26.27px |
| `--sc-t-2xl` | `clamp(2.1rem, 1.6rem + 2.4vw, 3.4rem)` | **54.39px** | 44.03px | 34.95px |
| `--sc-t-3xl` | `clamp(2.8rem, 1.9rem + 4.2vw, 5rem)` | **80px** | 62.64px | 46.77px |
| `--sc-t-4xl` | `clamp(3.4rem, 1.9rem + 6.6vw, 7.5rem)` | **120px** | 81.08px | 56.13px |

`--sc-t-xl` and `--sc-t-4xl` are declared but unused on this page: every display
size is a per-element `clamp()` instead (see the table below).

### Tracking, leading, measure

| Token | Value |
|---|---|
| `--sc-track-tight` | `-0.035em` |
| `--sc-track-snug` | `-0.02em` |
| `--sc-track-normal` | `-0.005em` (body default → -0.09px at 18px) |
| `--sc-track-wide` | `0.08em` (the label overrides to `0.12em`) |
| `--sc-leading-none` | `0.94` |
| `--sc-leading-tight` | `1.06` (unused here) |
| `--sc-leading-body` | `1.62` → 29.16px at 18px |
| `--sc-measure` | `62ch` → **699.67px** / 663.05 / 631.78 |

Tracking tightens as size grows — optical correction, not decoration.

### Per-element display sizes (all resolved at 1440)

| Element | Declared | 1440 | Weight | Leading | Tracking |
|---|---|---|---|---|---|
| `.nh-hero__copy h1` | `clamp(2.7rem, 1.6rem + 6vw, 6.6rem)` | **105.6px** | 700 | 99.26px | -3.696px |
| `.sc-display--lg` (proof h2) | `--sc-t-3xl` | **80px** | 700 | 75.2px | -2.8px |
| `.sc-display--md` (ring h2) | `--sc-t-2xl` | **54.4px** | 700 | 51.14px | -1.36px |
| `.nh-story h2` | `clamp(1.9rem, 1.2rem + 2.6vw, 3.6rem)` | **56.64px** | 700 | 53.24px | -1.982px |
| `.nh-rail__lead h2` | `clamp(2rem, 1.3rem + 2.8vw, 3.8rem)` | **60.8px** | 700 | 57.15px | -2.128px |
| `.nh-book h2` | `clamp(2rem, 1.3rem + 3vw, 4rem)` | **64px** | 700 | 60.16px | -2.24px |
| `.nh-close__inner h2` | `clamp(2.4rem, 1.4rem + 5vw, 5.6rem)` | **89.6px** | 700 | 84.22px | -3.136px |
| `.nh-hero__n` | `clamp(1.25rem, 1rem + 1.1vw, 1.85rem)` | **29.6px** | 700 | 1 | -0.888px |
| `.nh-reg__n` | `clamp(1.6rem, 1.1rem + 2vw, 2.7rem)` | **43.2px** | 700 | 1 | -1.296px |
| `.nh-plate__title` | `clamp(1.25rem, 1rem + 0.9vw, 1.7rem)` | **27.2px** | 700 | 28.56px | -0.816px |

### Text styles

| Class | Size | Weight | Leading | Colour |
|---|---|---|---|---|
| `.sc-lede` | `--sc-t-lg` = 24px | **500** | 34.56px (1.44) | `--sc-ink` |
| `.sc-body` | `--sc-t-base` = 18px | 400 | 29.16px | `--sc-ink-soft` |
| `.sc-label` | **0.72rem = 11.52px** | 600 | 18.66px | `--sc-ink-soft`, uppercase, tracking `0.12em` = 1.3824px |
| `.nh-hero__sub` | `--sc-t-lg` = 24px | **450** | 34.8px (1.45) | `#2A2F3A` |
| `.nh-story__text p` | `--sc-t-lg` = 24px | **450** | 36px (1.5) | `--sc-ink` |
| `.nh-reg__k` | `--sc-t-sm` = 15.2px | 600 | 24.62px | `--sc-ink` |
| `.nh-reg__d` | `--sc-t-sm` = 15.2px | 400 | 22.8px (1.5) | `--sc-ink-soft` |
| `.nh-plate__sub` | 0.86rem = 13.76px | 400 | 19.95px | `--sc-ink-soft` |
| `.nh-foot` | 0.8rem = 12.8px | 400 | 20.74px | `--sc-ink-soft` |

Weight 450 appears twice and is deliberate — Inter is variable, so it is a real
weight, not a rounded 400.

## Spacing

A 4px base, with the middle steps an 8-only scale misses. These are absolute and
do **not** scale with viewport:

| Token | `--sc-1` | `--sc-2` | `--sc-3` | `--sc-4` | `--sc-5` | `--sc-6` | `--sc-7` | `--sc-8` | `--sc-9` | `--sc-10` | `--sc-11` |
|---|---|---|---|---|---|---|---|---|---|---|---|
| px | 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64 | 96 | 128 | 192 |

Fluid rhythm, which does scale:

| Token | Declared | 1440 | 768 | 390 |
|---|---|---|---|---|
| `--sc-section` | `clamp(4.5rem, 9vw, 11rem)` | **129.59px** | 72px | 72px |
| `--sc-gutter` | `clamp(1.25rem, 5vw, 5.5rem)` | **72px** | 38.39px | 20px |
| `--sc-maxw` | `82rem` | **1312px** | 1312px | 1312px |

Page-level spacing built from them: plane padding
`clamp(2.5rem, 5.5vw, 5.5rem)` × `clamp(1.5rem, 5vw, 5rem)` → **79.2px × 72px**;
section padding-block `clamp(1.5rem, 4vw, 3rem)` → **48px**; plane width
`min(100% - 2×gutter, --sc-maxw)` → **1286px**.

## Radius

| Token | Floor | This page | Applied to |
|---|---|---|---|
| `--sc-r-sm` | 6px | 6px | focus-ring rounding |
| `--sc-r-md` | 12px | **14px** | — |
| `--sc-r-lg` | 20px | **22px** | `.nh-plane` |
| `--sc-r-pill` | 999px | 999px | pill nav, bar links, bar button |

Literal radii used instead of tokens: 18px (`.nh-plate__in`), 16px
(`.nh-ring__copy`, `.nh-plate-soft`, `.nh-ph`, `.nh-room__frame`), 14px
(`.nh-btn--lg`), 12px (`.nh-btn`, `.nh-ring__caption`), 10px (`.nh-reg__row`,
room captions), `6px 14px 14px 6px` (the book plate — a spine).

## Elevation

The shadow hue is re-tinted for a light ground: `--sc-shadow-color: 214 32% 28%`
→ `rgb(49, 68, 94)` in every computed shadow.

| Token | Value |
|---|---|
| `--sc-e1` | `0 1px 2px /0.08, 0 2px 6px -1px /0.06` |
| `--sc-e2` | `0 2px 4px /0.07, 0 12px 28px -8px /0.14` — the plane |
| `--sc-e3` | `0 4px 10px /0.08, 0 26px 56px -14px /0.20, 0 60px 110px -40px /0.18` — photographs, book |
| `--sc-edge` | `inset 0 1px 0 rgb(255 255 255 / 0.9)` — the lip highlight on every raised surface |

Every shadow has an offset **and** a soft blur and is tinted to the canvas hue.
The white `0 0 0 1px` rings that appear alongside them are hairlines, not
shadows.

## Motion

| Token | Value |
|---|---|
| `--sc-ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` — used by essentially everything |
| `--sc-ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` |
| `--sc-ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` |
| `--sc-d-fast` / `--sc-d-base` / `--sc-d-slow` | 160 / 240 / 420ms |

Durations actually written into this page's classes: 140ms (hover background),
160ms (shadow, filter, transform), 420ms (pill opacity), 560ms (pill transform),
620ms (`[data-sc-in]`), 820ms (per-word flow), 940ms (block flow). Easing curves
inside the runtime are exponential (`1 - exp(-k·dt)`), not CSS.

## Layers

| Token | Value | Occupant |
|---|---|---|
| — | 95 | `.nh-progress` |
| `--sc-z-chrome` | 60 | `.nh-pill` |
| `--sc-z-copy` | 20 | `.sc-copy` blocks |
| — | 3 | `.sc-grain`, `.nh-hero__bar` (within its stage) |
| `--sc-z-stage` | 1 | `main#top`, every `[data-sc-stage]` |
| — | 0 | `canvas#glass` |

## Browser surfaces

Themed rather than left at the browser default — selection
(`background: var(--sc-accent); color: #fff`), caret and accent colour, focus
ring (`2px solid var(--sc-accent)`, offset 3px), thin scrollbar tinted
`color-mix(in oklab, var(--sc-ink) 26%, transparent)`, and tabular numerals on
`table, .sc-nums, [data-sc-count]`.
