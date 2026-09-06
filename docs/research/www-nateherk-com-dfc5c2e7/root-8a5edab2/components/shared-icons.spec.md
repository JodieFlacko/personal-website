# shared/icons Specification

## Overview
- **Target file:** `src/components/sites/www-nateherk-com-dfc5c2e7/shared/icons.tsx`
- **Screenshot:** visible in every act screenshot; clearest in
  `desktop-02-proof-y1500.png` (the registry rows' arrows).
- **Interaction model:** static

Three inline SVGs lifted verbatim from the source markup. Site-scoped rather
than page-scoped because a second page from the same site would reuse them. No
icon library is used anywhere in the clone — Lucide is still a dependency of the
template but this page imports none of it.

## DOM Structure
Each export renders a single `<svg aria-hidden>` with one `<path>`. `size` sets
both `width` and `height`; `strokeWidth` and `className` pass through so each
call site keeps the source's exact geometry.

## Computed Styles

### `PlayIcon` — solid triangle, YouTube CTAs
- viewBox `0 0 24 24`; fill `currentColor`; no stroke
- path `M8 5v14l11-7z`
- call sites: `HeroAct` at 14px, `CloseAct` at 16px (colour inherited: `rgb(255, 255, 255)` inside `.nh-btn`)

### `ArrowUpRightIcon` — outbound link
- viewBox `0 0 24 24`; fill none; stroke `currentColor`; default strokeWidth 1.7
- path `M7 17 17 7M9 7h8v8`
- call sites: `ProofSection` 16px/1.7 (`.nh-reg__go`, colour `rgb(11, 114, 204)`),
  `RecognitionAct` 16px/1.7 (`.nh-plate__go`, same colour, absolutely positioned
  at top 17.6px / right 17.6px inside the plate), `BookSection` 14px/1.8 (inside
  `.nh-btn`, white)

### `ArrowRightIcon` — same-site continuation
- viewBox `0 0 24 24`; fill none; stroke `currentColor`; default strokeWidth 1.8
- path `M5 12h14M13 6l6 6-6 6`
- call site: `StorySection` 14px/1.8 inside `.nh-btn--ghost` (colour
  `rgb(11, 13, 16)`)

Every instance inherits `display: block; max-width: 100%` from the ported
reset's `img, video, canvas, svg` rule, and `overflow: hidden`.

## States & Behaviors

### Registry row hover (the only icon that moves)
- **Trigger:** hover on the enclosing `.nh-reg__row`
- **State A:** `transform: none`
- **State B:** `transform: translate(2px, -2px)`
- **Transition:** `transform 160ms cubic-bezier(0.23, 1, 0.32, 1)`

Word-splitting skips SVG subtrees (`wrapWords` filters nodes whose parent
`closest('svg')` matches), so an icon inside a `[data-nh-flow]` block is never
torn apart.

## Per-State Content
N/A.

## Assets
None — the paths are the assets.

## Text Content (verbatim)
N/A. Every icon is `aria-hidden`; the adjacent text carries the meaning.

## Responsive Behavior
Fixed pixel sizes at every width; no breakpoint changes them.
