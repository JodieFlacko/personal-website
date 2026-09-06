import { getDictionary } from "@/content/dictionaries";
import { LINKS } from "@/content/shared";

import { Counter } from "./Counter";
import { ArrowUpRightIcon } from "./icons";
import { LocaleSwitch } from "./LocaleSwitch";
import { Placeholder } from "./Placeholder";
import { SiteMark } from "./SiteMark";

/**
 * Act 1 · CLARITY — pinned for 1.35 viewports.
 *
 * The stage sticks while the act scrolls past. The runtime recedes the
 * portrait slot (translateY up to 18px, scale down to 0.95) across the act's
 * progress and hands the links off to the docking pill on the way out. The two
 * figures tick up from 0 on load; the headline, sub and CTA flow in word by
 * word on the delays written into the markup.
 *
 * The two figures are the page's opening argument: what the work produced, and
 * how much of it there is. Coverage leads because it is the only number here
 * counted at both ends.
 */
export async function HeroAct() {
  const { hero, nav, slotNote } = await getDictionary();

  return (
    <section id="hero" data-sc-act="pin" data-sc-span="1.35">
      <div data-sc-stage className="nh-hero" data-sc-verify-state="hero:0">
        <div className="nh-hero__scrim" aria-hidden="true" />

        <div className="nh-hero__bar" data-sc-cue="0 1 0 0" data-sc-rise="0">
          <a className="nh-mark" href="#top">
            <SiteMark />
          </a>
          <div className="nh-hero__links">
            <a href="#work">{nav.work}</a>
            <a href="#about">{nav.about}</a>
            <LocaleSwitch label={nav.language} />
            <a className="nh-btn" href="#contact">
              {nav.cta}
            </a>
          </div>
        </div>

        <div className="sc-copy nh-hero__copy" data-sc-cue="0 1 0 0">
          <ul
            className="nh-hero__stats"
            aria-label={hero.sub}
            data-nh-flow
            data-nh-flow-delay="120"
          >
            {hero.stats.map((stat, i) => (
              <li key={stat.figure}>
                <span className="nh-hero__n">
                  <Counter
                    figure={stat.figure}
                    display={stat.display}
                    mode="tick"
                    delay={200 + i * 120}
                  />
                </span>
                <small>{stat.label}</small>
              </li>
            ))}
          </ul>
          <h1
            className="sc-display"
            data-nh-flow
            data-nh-flow-delay="260"
            data-nh-flow-step="90"
          >
            {hero.headline.before}
            <span className="nh-em">{hero.headline.em}</span>
            {hero.headline.after}
          </h1>
          <p className="nh-hero__sub" data-nh-flow data-nh-flow-delay="640">
            {hero.sub}
          </p>
          <p
            className="nh-hero__cta"
            data-nh-flow="block"
            data-nh-flow-delay="1050"
          >
            <a
              className="nh-btn nh-btn--lg"
              href={LINKS.concierge}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.primary}
              <ArrowUpRightIcon size={15} strokeWidth={1.8} />
            </a>
            <a className="nh-link" href="#work">
              {hero.secondary}
            </a>
          </p>
        </div>

        <figure className="nh-hero__portrait" id="heroPortrait">
          <span className="nh-hero__plate" aria-hidden="true" />
          <Placeholder label={hero.slot} note={slotNote} variant="portrait" />
        </figure>
      </div>
    </section>
  );
}
