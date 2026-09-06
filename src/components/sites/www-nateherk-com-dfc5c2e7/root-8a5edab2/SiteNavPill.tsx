import Link from "next/link";

import { ASSETS, LINKS } from "./content";

/**
 * The docking nav. Hidden while the hero's own bar carries the links; the
 * runtime adds `.is-docked` once the hero stage's bottom passes 62% of the
 * viewport, which is what fades and slides it in.
 */
export function SiteNavPill() {
  return (
    <nav className="nh-pill" aria-label="Site">
      <Link className="nh-pill__mark" href="/" aria-current="page">
        <img src={`${ASSETS}/images/logo.png`} alt="" width={22} height={22} />
        <span>Nate Herk</span>
      </Link>
      <a href="/about">About</a>
      <a href="/thoughts">Thoughts</a>
      <a
        className="nh-btn"
        href={LINKS.work}
        target="_blank"
        rel="noopener noreferrer"
      >
        Work with Me
      </a>
    </nav>
  );
}
