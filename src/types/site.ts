import type { FigureKey, ProjectId } from "@/content/shared";

/** Content shapes for Giuseppe Ciccone's single scroll-driven page.
 *
 *  The split between this file, `@/content/shared` and the two locale
 *  dictionaries is deliberate. Anything a reader sees is translated and lives
 *  in `en.ts` / `it.ts`; anything a *machine* reads — the numeric target a
 *  counter animates to, how many decimals it carries, which frame shape a
 *  project card uses — lives once in `shared.ts`, because a figure that can
 *  drift between two locales is a figure that will. */

/** A number the page animates to. Single-sourced in `@/content/shared`. */
export interface Figure {
  /** Counter target. Also the value shown when JS never boots. */
  to: number;
  /** Decimals to render. 2.55 must not round to 3. */
  decimals: 0 | 2;
  /** Rendered after the number in the accent colour: "%", "+" or nothing. */
  suffix: string;
}

/** One statistic in the hero bar. */
export interface HeroStat {
  figure: FigureKey;
  /** Locale-formatted target, painted before JS boots and for reduced motion. */
  display: string;
  label: string;
}

/** One row of the results registry — a delta, not a total. */
export interface ResultRow {
  figure: FigureKey;
  /** The "before" side, already locale-formatted. Absent on rows that are
   *  context rather than a movement. */
  from?: string;
  display: string;
  label: string;
  description: string;
  /** How solid the row is: measured, a check, or the client's own scale. */
  tag: string;
}

/** One plate on the capability ring. Order matters: the ring parks plate `i`
 *  at `i * 360 / N` degrees and turns exactly one lap minus a plate. */
export interface CapabilityPlate {
  area: string;
  title: string;
  proof: string;
}

/** Aspect variants the work rail uses to vary rhythm as it pans sideways.
 *  `strip` is the odd one out: it holds two real ERP crops and sizes to them
 *  rather than to a ratio. */
export type FrameShape = "land" | "wide" | "square" | "tall" | "strip";

/** A real, shipped screenshot. */
export interface ProjectMedia {
  src: string;
  width: number;
  height: number;
}

/** The locale-independent half of a work-rail card. */
export interface ProjectFrame {
  shape: FrameShape;
  stack: string;
  media?: readonly ProjectMedia[];
}

/** The translated half of a work-rail card. Problem, then what was built,
 *  then what changed — the order every project page in the record follows. */
export interface ProjectCard {
  id: ProjectId;
  kind: string;
  title: string;
  problem: string;
  built: string;
  changed: string;
  /** Alt text, positional against `ProjectFrame.media`. */
  mediaAlt?: readonly string[];
  /** Caption under a frame that holds real imagery. */
  caption?: string;
  /** What an empty frame is holding a place for. */
  slot?: string;
}

export interface SiteContent {
  /** Second line under every empty image slot, e.g. "Photograph to come". */
  slotNote: string;
  meta: {
    title: string;
    description: string;
    keywords: readonly string[];
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    work: string;
    about: string;
    contact: string;
    cta: string;
    /** aria-label on the language switch. */
    language: string;
  };
  hero: {
    stats: readonly HeroStat[];
    /** Split so one word can carry the accent underline. */
    headline: { before: string; em: string; after: string };
    sub: string;
    primary: string;
    secondary: string;
    /** Subject of the portrait slot beside the headline. */
    slot: string;
  };
  results: {
    heading: string;
    lede: string;
    rows: readonly ResultRow[];
    noteLabel: string;
    note: string;
  };
  capabilities: {
    heading: string;
    body: string;
    caption: string;
    centreSlot: string;
    plates: readonly CapabilityPlate[];
  };
  story: {
    heading: string;
    paragraphs: readonly string[];
    cta: string;
    slots: readonly [string, string];
  };
  work: {
    leadHeading: string;
    leadBody: string;
    end: string;
    endCta: string;
    labels: { problem: string; built: string; changed: string; stack: string };
    projects: readonly ProjectCard[];
  };
  feature: {
    label: string;
    heading: string;
    lede: string;
    body: string;
    languagesLabel: string;
    languages: readonly string[];
    primary: string;
    secondary: string;
    slot: string;
  };
  close: {
    heading: string;
    primary: string;
    altBefore: string;
    altLink: string;
    altAfter: string;
    place: string;
    rights: string;
  };
}
