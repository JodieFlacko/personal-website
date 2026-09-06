# SiteNavPill Specification

## Overview
- **Target file:** `<page>/SiteNavPill.tsx`
- **Screenshot:** `docs/design-references/www-nateherk-com-dfc5c2e7/root-8a5edab2/desktop-02-proof-y1500.png` (docked) · `desktop-01-hero-scroll0.png` (parked, invisible)
- **Interaction model:** scroll-driven (docks once the hero stage is past), plus hover states

The page has two navs. The hero's own bar carries the links while the hero is on
screen; this pill takes over on the way out. It is fixed furniture, rendered
outside `<main>`, above every plane.

## DOM Structure

```
nav.nh-pill[aria-label="Site"]
  Link.nh-pill__mark[href="/" aria-current="page"]   img(22×22) + span "Nate Herk"
  a[href="/about"]      "About"
  a[href="/thoughts"]   "Thoughts"
  a.nh-btn[href=LINKS.work target=_blank]  "Work with Me"
```

`next/link` is used only for `/` — the one route that exists. `/about` and
`/thoughts` stay plain `<a>` because those pages are out of scope.

## Computed Styles (exact values from getComputedStyle)

### Container `nav.nh-pill` (undocked, at scroll 0)
- position: fixed; top: 14.4px (`0.9rem`); left: 50%; zIndex: **60**
- width: 401.14px; height: 47.86px (intrinsic)
- padding: `5.6px 6.4px 5.6px 8.8px`
- display: flex; alignItems: center; gap: 4px
- borderRadius: 999px
- backgroundColor: `rgba(255, 255, 255, 0.62)`
- boxShadow: `rgba(255, 255, 255, 0.9) 0 1px 0 inset, rgba(255, 255, 255, 0.7) 0 0 0 1px, rgba(49, 68, 94, 0.35) 0 10px 30px -12px, rgba(11, 13, 16, 0.06) 0 1px 3px`
- backdropFilter: `blur(16px) saturate(1.3)` *(from CSS — reports `none` in software rendering)*
- transform: `translate(-50%, -140%)` → measured `matrix(1, 0, 0, 1, -200.57, -67.0031)`, i.e. y ≈ **-53px**
- opacity: 0; visibility: hidden
- transition: `transform 560ms cubic-bezier(0.23, 1, 0.32, 1), opacity 420ms …, visibility 0s linear 560ms`

### `.nh-pill__mark`
- fontSize: 13.76px; fontWeight: 500; lineHeight: 22.29px; color: `rgb(11, 114, 204)` (from `[aria-current="page"]`)
- padding: `7.2px 8.8px 7.2px 11.2px`; margin-right: 2.4px
- display: flex; flex: 0 0 auto; alignItems: center; gap: 8px; borderRadius: 999px
- borderRight: `1px solid rgba(11, 13, 16, 0.1)`
- `img` — 22×22px, minWidth 22px, flex `0 0 22px`
- `span` — fontWeight: 700; letterSpacing: -0.2752px (`-0.02em`)

### `.nh-pill a` (About, Thoughts)
- fontSize: 13.76px (`0.86rem`); fontWeight: 500; lineHeight: 22.29px
- color: `rgb(11, 13, 16)`; textDecoration: none
- padding: `7.2px 11.2px` (`0.45rem 0.7rem`); borderRadius: 999px
- widths: About 61.44px, Thoughts 84.23px; height 36.67px
- transition: `background-color 140ms cubic-bezier(0.23, 1, 0.32, 1)`

### `.nh-pill .nh-btn`
- fontSize: 13.12px (`0.82rem`); fontWeight: 500 in the pill (600 elsewhere)
- backgroundColor: `rgb(11, 114, 204)`; color: white
- padding: `6.56px 12.464px` (`0.5em 0.95em`); borderRadius: 999px
- width: 110.31px; height: 34.34px; gap: 7.216px
- boxShadow: `rgba(255,255,255,0.25) 0 1px 0 inset, rgba(11,114,204,0.55) 0 8px 22px -8px, rgba(11,13,16,0.12) 0 1px 2px`

## States & Behaviors

### Docking
- **Trigger:** every controller frame — `.is-docked` toggles on
  `heroStage.getBoundingClientRect().bottom < innerHeight * 0.62`.
- **State A (parked):** `transform: translate(-50%, -140%)`; opacity 0;
  visibility hidden (out of the tab order while off-screen).
- **State B (docked):** `transform: translate(-50%, 0)`; opacity 1;
  visibility visible; `transition-delay: 0s, 0s, 0s`.
- **Transition:** transform 560ms, opacity 420ms, both `cubic-bezier(0.23, 1, 0.32, 1)`;
  visibility is delayed 560ms on the way out only, so it stays clickable through the exit.
- **Implementation:** class toggle from the controller's rAF loop; the CSS owns
  the motion. Under `prefers-reduced-motion` the transition is dropped entirely.

### Hover states
- **`.nh-pill a`:** backgroundColor `transparent` → `rgb(11 13 16 / 0.05)`, transition `background-color 140ms`
- **`.nh-pill .nh-btn`:** backgroundColor `rgb(11, 114, 204)` → `#0A66B8`, transition `background-color 140ms`

### Focus states
- `.nh-pill a:focus-visible` — `outline: 2px solid rgb(59, 170, 255)`, `outline-offset: 1px`
- The mark carries `aria-current="page"`, which is what tints it blue.

## Per-State Content
N/A — one state, four links.

## Assets
- `<assets>/images/logo.png` (512×512 source, rendered 22×22)

## Text Content (verbatim)
- "Nate Herk"
- "About"
- "Thoughts"
- "Work with Me" → `https://uppitai.com/`

## Responsive Behavior
- **Desktop (1440px):** as measured above.
- **Tablet (768px):** unchanged — the ≤860px rules have not engaged yet.
- **Mobile (390px):** two changes, both at ≤860px —
  `.nh-pill__mark span { display: none }` (the wordmark drops, the logo stays)
  and `a:not(.nh-btn):not(.nh-pill__mark) { padding: 0.45rem 0.55rem }`.
  On coarse pointers the frosted surface is replaced by a plain plate:
  backgroundColor `rgba(250, 251, 253, 0.94)`, `backdrop-filter: none` —
  measured, since a backdrop blur over a repainting canvas is the first thing to
  drop frames on a phone GPU.
- **Breakpoints:** 860px (layout), `pointer: coarse` (surface).
