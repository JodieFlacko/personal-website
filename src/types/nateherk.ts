/** Content shapes for the nateherk.com home page clone. */

/** One row of the audience registry in the "What I'm up to" section. */
export interface RegistryRow {
  /** Numeric target the counter animates to. */
  count: number;
  /** Pre-rendered value shown before JS boots and to reduced-motion readers. */
  display: string;
  label: string;
  description: string;
  href: string;
}

/** A partner/press logo in the trust row. */
export interface TrustLogo {
  src: string;
  alt: string;
  /** Logos with a taller lockup get `.is-tall` to normalise optical size. */
  tall?: boolean;
}

/** One award plate on the recognition ring. */
export interface AwardPlate {
  source: string;
  title: string;
  subtitle: string;
  /** Present when the plate links out; absent plates render as a static div. */
  href?: string;
  /** Optional badge image shown above the text. */
  badge?: { src: string; alt: string };
}

/** Aspect variants the rail uses to vary rhythm as it pans sideways. */
export type RoomShape = "land" | "wide" | "square" | "tall";

/** One photograph on the horizontally panning rail. */
export interface RoomPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  shape: RoomShape;
}
