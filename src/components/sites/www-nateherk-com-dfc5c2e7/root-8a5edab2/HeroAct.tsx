import Link from "next/link";

import { PlayIcon } from "../shared/icons";
import { ASSETS, LINKS } from "./content";

/**
 * Act 1 · CLARITY — pinned for 1.35 viewports.
 *
 * The stage sticks while the act scrolls past. The runtime recedes the portrait
 * (translateY up to 18px, scale down to 0.95) across the act's progress and
 * hands the links off to the docking pill on the way out. Stats tick up from 0
 * on load; the headline, sub and CTA flow in word by word on the delays written
 * into the markup.
 */
export function HeroAct() {
  return (
    <section id="hero" data-sc-act="pin" data-sc-span="1.35">
      <div data-sc-stage className="nh-hero" data-sc-verify-state="hero:0">
        <div className="nh-hero__scrim" aria-hidden="true" />

        <div className="nh-hero__bar" data-sc-cue="0 1 0 0" data-sc-rise="0">
          <Link className="nh-mark" href="/">
            <img
              src={`${ASSETS}/images/logo.png`}
              alt=""
              width={28}
              height={28}
            />
            <span>
              Nate Herk<i>.</i>
            </span>
          </Link>
          <div className="nh-hero__links">
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
          </div>
        </div>

        <div className="sc-copy nh-hero__copy" data-sc-cue="0 1 0 0">
          <ul
            className="nh-hero__stats"
            aria-label="Audience"
            data-nh-flow
            data-nh-flow-delay="120"
          >
            <li>
              <span className="nh-hero__n">
                <span data-nh-tick="950000" data-nh-tick-delay="200">
                  950,000
                </span>
                <i>+</i>
              </span>
              <small>YouTube subscribers</small>
            </li>
            <li>
              <span className="nh-hero__n">
                <span data-nh-tick="450000" data-nh-tick-delay="320">
                  450,000
                </span>
                <i>+</i>
              </span>
              <small>AI Automation Society members</small>
            </li>
          </ul>
          <h1
            className="sc-display"
            data-nh-flow
            data-nh-flow-delay="260"
            data-nh-flow-step="90"
          >
            AI automation made <span className="nh-em">easy</span>.
          </h1>
          <p className="nh-hero__sub" data-nh-flow data-nh-flow-delay="640">
            I help people master AI agents, build automations, and turn their
            skills into income.
          </p>
          <p
            className="nh-hero__cta"
            data-nh-flow="block"
            data-nh-flow-delay="1050"
          >
            <a
              className="nh-btn nh-btn--lg"
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon size={14} />
              Watch on YouTube
            </a>
            <a
              className="nh-link"
              href={LINKS.society}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join AI Automation Society
            </a>
          </p>
        </div>

        <figure className="nh-hero__portrait" id="heroPortrait">
          <span className="nh-hero__plate" aria-hidden="true" />
          <img
            src={`${ASSETS}/images/portrait-speaking.webp`}
            width={938}
            height={1500}
            alt="Nate Herk speaking into a microphone."
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}
