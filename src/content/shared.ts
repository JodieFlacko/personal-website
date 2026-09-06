import type { Figure, ProjectFrame } from "@/types/site";

/** Everything on this page that is not translated.
 *
 *  Two rules keep it here rather than in the locale dictionaries:
 *  a number that appears in both languages is written once, and the frame
 *  geometry of a slot is fixed independently of the copy that sits beside it,
 *  so a longer Italian sentence cannot move a photograph. */

export const SITE_URL = "https://prima-studio-agency.com";

export const LINKS = {
  /** The concierge, live and openable. The only thing on this site a reader
   *  can go and use. */
  concierge: "https://approdo.vercel.app/",
  github: "https://github.com/JodieFlacko",
  email: "peppociccone13@gmail.com",
} as const;

export const LOCALES = ["en", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Locale-independent labels for the language switch. */
export const LOCALE_LABELS: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  it: { short: "IT", full: "Italiano" },
};

/** The numbers, written once.
 *
 *  Each is traceable to `portfolio/evidence/review-lift-measurement.md`, except
 *  `systems` (a count of what is deployed) and `orders` (the client's own
 *  operating figure). The qualifier that makes each one hold up travels with it
 *  in the copy, in the same row — never in a footnote. */
export const FIGURES = {
  /** Review-request coverage after go-live. Both ends counted, not estimated. */
  coverage: { to: 98, decimals: 0, suffix: "%" },
  /** Production systems delivered as sole developer in under six months. */
  systems: { to: 4, decimals: 0, suffix: "" },
  /** Review rate per 100 units, like-for-like. The verb is *moved*. */
  reviewRate: { to: 2.55, decimals: 2, suffix: "%" },
  /** Average star rating. A check, not a third result. */
  rating: { to: 4.38, decimals: 2, suffix: "" },
  /** The client's daily order volume — context, not an outcome. */
  orders: { to: 280, decimals: 0, suffix: "+" },
} as const satisfies Record<string, Figure>;

export type FigureKey = keyof typeof FIGURES;

/** Rail order. The first card is on screen when the pan act begins and is
 *  exempt from the settle stagger, so the measured system leads. */
export const PROJECTS = [
  "reviews",
  "lightburn",
  "mexal",
  "b2b",
  "marea",
] as const;

export type ProjectId = (typeof PROJECTS)[number];

/** Frame geometry and stack per card.
 *
 *  The shapes alternate so the rail keeps a rhythm as it pans, and each one is
 *  chosen for the screenshot it is waiting for: a Telegram summary is square, a
 *  desktop app is wide, a phone is tall, a browser is landscape.
 *
 *  `mexal` is the only card holding real imagery today — the two redacted crops
 *  from the delivered skill bundle. They are wide strips, so that card sizes to
 *  its content instead of to a ratio. */
export const PROJECT_FRAMES: Record<ProjectId, ProjectFrame> = {
  reviews: {
    shape: "square",
    stack: "Python · Amazon SP-API · SQLite · systemd · Hetzner · Telegram",
  },
  lightburn: {
    shape: "wide",
    stack: "Tauri v2 · Rust · React · bundled Node sidecar · SQLite · signed auto-update",
  },
  mexal: {
    shape: "strip",
    stack: "Claude agent skill · computer use · Mexal (Passepartout / Zucchetti)",
    media: [
      {
        src: "/images/mexal-data-filter-redacted.png",
        width: 1917,
        height: 287,
      },
      {
        src: "/images/mexal-totale-selezione-redacted.png",
        width: 1912,
        height: 231,
      },
    ],
  },
  b2b: {
    shape: "tall",
    stack:
      "Next.js · TypeScript · Drizzle · PostgreSQL · Capacitor · Docker behind Caddy · Mexal ManWebAPI",
  },
  marea: {
    shape: "land",
    stack: "Next.js 16 · Vercel AI SDK · Claude Sonnet via AI Gateway, with fallbacks · Vercel",
  },
};
