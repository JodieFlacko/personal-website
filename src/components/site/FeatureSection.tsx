import { getDictionary } from "@/content/dictionaries";
import { LINKS } from "@/content/shared";

import { ArrowUpRightIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { Rich } from "./Rich";

/**
 * Act 6 · DELIGHT — a flow act.
 *
 * The plate carries `[data-nh-wipe]`: the runtime drives a clip-path
 * `inset(N% 0 0 0 round 18px)` from 100% to 0 as it enters, so the product
 * shot wipes up from its own base rather than fading in. Once complete the
 * inline clip-path is cleared so the sheen highlight can overflow again.
 *
 * The reference site sold a book here. This is the one thing on the page a
 * reader can go and use, which earns it the same slot — and the four
 * bestseller categories became the four languages she answers in.
 *
 * The body is about what she refuses to do, because that is the engineering.
 */
export async function FeatureSection() {
  const { feature, slotNote } = await getDictionary();

  return (
    <section className="nh-section" data-sc-act="flow">
      <div className="nh-plane nh-feat" data-nh-depth>
        <figure className="nh-feat__art">
          <span className="nh-feat__glow" aria-hidden="true" />
          <div className="nh-feat__plate" data-nh-wipe>
            <Placeholder label={feature.slot} note={slotNote} />
            <span className="nh-feat__sheen" aria-hidden="true" />
          </div>
        </figure>
        <div className="sc-stack">
          <p className="sc-label" data-nh-flow>
            {feature.label}
          </p>
          <h2
            className="sc-display"
            data-nh-flow
            data-nh-flow-delay="120"
            data-nh-flow-step="90"
          >
            {feature.heading}
          </h2>
          <p className="sc-lede" data-nh-flow data-nh-flow-delay="360">
            {feature.lede}
          </p>
          <p className="sc-body" data-nh-flow data-nh-flow-delay="520">
            <Rich text={feature.body} />
          </p>
          <p className="sc-label" data-nh-flow data-nh-flow-delay="700">
            {feature.languagesLabel}
          </p>
          <ul className="nh-feat__langs" data-nh-flow data-nh-flow-delay="800">
            {feature.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <p
            className="nh-feat__cta"
            data-nh-flow="block"
            data-nh-flow-delay="1000"
          >
            <a
              className="nh-btn"
              href={LINKS.concierge}
              target="_blank"
              rel="noopener noreferrer"
            >
              {feature.primary}
              <ArrowUpRightIcon size={14} strokeWidth={1.8} />
            </a>
            <a className="nh-link" href="#contact">
              {feature.secondary}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
