# Component Inventory — nateherk.com `/`

Eleven React modules, all server components except `ScrollRuntime`. Full
per-component specifications live in [`components/`](components/); this is the
map.

## The page

`src/app/page.tsx` renders, in this order:

```
<GlassBackdrop />        canvas#glass · .sc-grain · .nh-progress
<SiteNavPill />          nav.nh-pill
<main id="top">
  <HeroAct />            act 1 · pin 1.35
  <ProofSection />       act 2 · flow
  <RecognitionAct />     act 3 · pin 3.4
  <StorySection />       act 4 · flow
  <RoomsAct />           act 5 · pan 3.5
  <BookSection />        act 6 · flow
  <CloseAct />           act 7 · pin 1.5  (footer inside the stage)
</main>
<ScrollRuntime />        boots the engine, renders nothing
```

Order is the page's argument and the engine reads act order from the DOM, so it
must not change.

## Inventory

| Component | Lines | Root element | Interaction model | Distinct sub-components |
|---|---|---|---|---|
| `GlassBackdrop` | 18 | fragment ×3 | scroll-driven (shader uniforms) | glass canvas, grain, progress bar |
| `SiteNavPill` | 29 | `nav.nh-pill` | scroll-driven dock + hover | mark, text link, pill button |
| `HeroAct` | 123 | `section#hero` | scroll-driven pin + load counters | bar, stat, headline, sub, CTA pair, portrait |
| `ProofSection` | 79 | `section.nh-section--first` | scroll-driven flow + hover | head, registry row ×4, trust row |
| `RecognitionAct` | 118 | `section#recognition` | scroll-driven pin + pointer lean | copy card, trophy figure, plate ×7, caption |
| `StorySection` | 77 | `section.nh-section` | scroll-driven flow | prose column, ghost button, photo ×2 |
| `RoomsAct` | 54 | `section#rooms` | scroll-driven pan | lead plate, room ×6 (4 shapes), end block |
| `BookSection` | 84 | `section.nh-section` | scroll-driven flow + wipe | cover art, copy stack, category list, CTA pair |
| `CloseAct` | 96 | `section#watch` | scroll-driven pin (3 cues) | headline, CTA, alt line, signature, footer |
| `ScrollRuntime` | 39 | — | static (mount effect) | — |
| `shared/icons` | 68 | — | static | `PlayIcon`, `ArrowUpRightIcon`, `ArrowRightIcon` |

**Every section is scroll-driven.** There are no click-driven tabs, no
carousels, no accordions and no time-driven cycling anywhere on the page. The
only pointer-driven behaviour is the ring's lean and per-element hover.

## Supporting modules

| File | Role |
|---|---|
| `<page>/content.ts` | `ASSETS`, `LINKS`, `REGISTRY_ROWS`, `TRUST_LOGOS`, `AWARD_PLATES`, `ROOM_PHOTOS`, `BOOK_CATEGORIES` — every string and href on the page, verbatim from the source |
| `src/types/nateherk.ts` | `RegistryRow`, `TrustLogo`, `AwardPlate`, `RoomShape`, `RoomPhoto` |
| `src/lib/sites/<site>/<page>/scrollcraft.js` | the ported engine (1176 lines) |
| `src/lib/sites/<site>/<page>/glass.js` | the ported WebGL shader |
| `src/lib/sites/<site>/<page>/home-runtime.js` | the ported page controller |

`AWARD_PLATES` order is load-bearing: the ring lays plates out at
`index * 360 / count`, so re-ordering the array re-choreographs act 3.

## Shared primitives, and what is deliberately absent

- **No shadcn/ui components are used.** The template ships them; this page needs
  none — the source has no dialog, dropdown, tab or form.
- **No `cn()`**: the only conditional class on the page is
  `logo.tall ? "is-tall" : undefined`.
- **No Lucide icons**: the three SVGs above are lifted from the source markup.
- **No Tailwind**: `globals.css` is not imported by the layout, so preflight
  cannot fight the ported reset.
- **No `next/image`**: plain `<img>` throughout, because `next/image` wraps the
  element and rewrites its styles, which breaks the ported CSS's descendant
  selectors. ESLint's `no-img-element` is disabled for `src/components/sites/**`.
- **`next/link` for `/` only** — `/about`, `/thoughts` and `/terms-of-access` are
  out of scope and do not exist, so they stay plain `<a>`.

## Repeated markup patterns

These recur across components and are styled once in `home.css`:

| Pattern | Where |
|---|---|
| `.nh-btn` (+`--lg`, +`--ghost`) | hero bar, hero CTA, story, book, close, pill |
| `.nh-link` (underlined blue) | hero CTA, book CTA, close alt line |
| `.nh-mark` (logo + wordmark + blue full stop) | hero bar, footer |
| `.nh-plane` (white card in front of the glass) | proof, story, book |
| `.nh-plate-soft` (frosted plate) | rail lead |
| `.sc-display` / `.sc-lede` / `.sc-body` / `.sc-label` | every act |
| `[data-nh-flow]` word reveal | 64 elements page-wide |
| `[data-nh-depth]` depth entrance | 5 elements (3 planes, 2 photos) |

## Accessibility surface

- Landmarks: `main#top`, `nav.nh-pill[aria-label="Site"]`,
  `nav.nh-social[aria-label="Social"]`, `footer`
- One `h1` (hero), six `h2`s — one per remaining act
- `aria-hidden` on the glass, grain, progress bar, hero scrim, hero plate, book
  glow and book sheen; empty `alt` on both logo marks and the n8n badge
- Every photograph has a descriptive `alt`; `aria-label="Audience"` on the hero
  stats and `aria-label="Awards and press"` on the ring scene
- `aria-current="page"` on the pill's mark
- The pill is `visibility: hidden` while undocked, so it is out of the tab order
- Two keyboard affordances live in the controller, because a pinned act cannot
  be scrolled into a cue by the browser: focusing inside `#watch` parks the page
  at 60% of that act's travel, and focusing a ring plate turns the ring to face it
