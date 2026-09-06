import { getDictionary } from "@/content/dictionaries";
import { LINKS } from "@/content/shared";

import { MailIcon } from "./icons";
import { LocaleSwitch } from "./LocaleSwitch";
import { SiteMark } from "./SiteMark";

/**
 * Act 7 · RESOLVE — pinned for 1.5 viewports, the `#contact` anchor, and the
 * footer lives inside the stage so the page ends on a held frame rather than
 * scrolling past one.
 *
 * The [data-sc-cue] values stagger the heading, the button and the alternative
 * line across the pin.
 *
 * The reference site closed on a signature image. Giuseppe has no signature
 * and one would have to be fabricated, so the element is gone rather than
 * filled with something invented.
 */
export async function CloseAct() {
  const { close, nav } = await getDictionary();

  return (
    <section id="contact" data-sc-act="pin" data-sc-span="1.5">
      <div data-sc-stage className="nh-close">
        <div className="nh-close__inner">
          <h2
            className="sc-display"
            data-sc-cue="0 1 0 0"
            data-nh-flow
            data-nh-flow-step="90"
          >
            {close.heading}
          </h2>
          <p data-sc-cue="0 1 0 0">
            <a
              className="nh-btn nh-btn--lg"
              href={`mailto:${LINKS.email}`}
            >
              <MailIcon size={16} strokeWidth={1.7} />
              {close.primary}
            </a>
          </p>
          <p className="nh-close__alt" data-sc-cue="0.05 1 0.25 0" data-nh-flow>
            {close.altBefore}
            <a
              className="nh-link"
              href={LINKS.concierge}
              target="_blank"
              rel="noopener noreferrer"
            >
              {close.altLink}
            </a>
            {close.altAfter}
          </p>
          <p className="nh-close__mail" data-sc-cue="0.12 1 0.3 0">
            <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          </p>
        </div>

        <footer className="nh-foot">
          <span className="nh-mark">
            <SiteMark />
          </span>
          <nav className="nh-social" aria-label={nav.contact}>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={`mailto:${LINKS.email}`}>Email</a>
          </nav>
          <LocaleSwitch label={nav.language} />
          <small>
            {close.rights}
            <i aria-hidden="true">·</i>
            {close.place}
          </small>
        </footer>
      </div>
    </section>
  );
}
