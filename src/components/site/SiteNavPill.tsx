import { getDictionary } from "@/content/dictionaries";

import { LocaleSwitch } from "./LocaleSwitch";
import { SiteMark } from "./SiteMark";

/**
 * The docking nav. Hidden while the hero's own bar carries the links; the
 * runtime adds `.is-docked` once the hero stage's bottom passes 62% of the
 * viewport, which is what fades and slides it in.
 *
 * Everything it points at is on this page, so the links are anchors. There is
 * no /work, /about or /contact route and none was built: neither the record
 * nor the client has separate content for one yet, and three thin pages would
 * be worse than three anchors that land where the reader expects.
 */
export async function SiteNavPill() {
  const { nav } = await getDictionary();

  return (
    <nav className="nh-pill" aria-label={nav.contact}>
      <a className="nh-pill__mark" href="#top" aria-current="page">
        <SiteMark />
      </a>
      <a href="#work">{nav.work}</a>
      <a href="#about">{nav.about}</a>
      <LocaleSwitch label={nav.language} />
      <a className="nh-btn" href="#contact">
        {nav.cta}
      </a>
    </nav>
  );
}
