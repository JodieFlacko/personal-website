# Component specifications — nateherk.com `/`

One spec per component in
`src/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/` (plus the
site-shared icon module). They are the auditable record the clone was built
against: every computed value below was read with `getComputedStyle()` from the
running clone, whose 20-selector comparison against the live source matched
exactly (see `../HANDOFF.md` §5).

## Measurement environment

| | |
|---|---|
| Viewports | **1440×900**, 768×1024, 390×844 · dpr 1 |
| Content width (viewport minus classic scrollbar) | 1430 / 758 / 380 |
| Document height | 11829 / 13542 / 12025 |
| Pointer | fine at 1440 and 768; **coarse** (touch emulation) at 390 |
| Browser | headless Chrome 142, software rendering |
| Page state | every one-shot reveal primed by stepping the whole document, then each act parked at its own progress 0 and settled |

Two consequences of that environment, both to read before trusting a number:

- **`backdrop-filter` reports `none`** without a GPU. Every frosted surface's
  blur is quoted from the ported CSS (byte-identical to the source) rather than
  from the measurement.
- **Sub-pixel widths** come from the 1430px content box. A browser with overlay
  scrollbars measures 1440 and the flow acts get shorter — the reason a fresh
  measurement may disagree with `../PAGE_TOPOLOGY.md` by a few dozen pixels per
  flow act unless a classic scrollbar is present.

## Conventions used in every spec

- `<page>` is `src/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2`.
- `<assets>` is `public/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2`, exported
  from `<page>/content.ts` as `ASSETS`.
- Colours are given as computed rgb. The token they come from is named once, in
  `../DESIGN_TOKENS.md`.
- "Engine" means `src/lib/sites/.../scrollcraft.js`; "controller" means
  `home-runtime.js`. Neither generates DOM — they only read attributes off the
  markup these components render.

| Spec | Component | Act |
|---|---|---|
| [GlassBackdrop](GlassBackdrop.spec.md) | fixed furniture behind and above everything | — |
| [SiteNavPill](SiteNavPill.spec.md) | docking nav | — |
| [ScrollRuntime](ScrollRuntime.spec.md) | boots the ported engine | — |
| [HeroAct](HeroAct.spec.md) | pinned stage, span 1.35 | 1 · clarity |
| [ProofSection](ProofSection.spec.md) | flow | 2 · confidence |
| [RecognitionAct](RecognitionAct.spec.md) | pinned stage, span 3.4 | 3 · awe |
| [StorySection](StorySection.spec.md) | flow | 4 · intimacy |
| [RoomsAct](RoomsAct.spec.md) | pan stage, span 3.5 | 5 · presence |
| [BookSection](BookSection.spec.md) | flow | 6 · delight |
| [CloseAct](CloseAct.spec.md) | pinned stage, span 1.5, footer inside | 7 · resolve |
| [shared-icons](shared-icons.spec.md) | three inline SVGs | — |
