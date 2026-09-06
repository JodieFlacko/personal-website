import { PlayIcon } from "../shared/icons";
import { ASSETS, LINKS } from "./content";

/**
 * Act 7 · RESOLVE — pinned for 1.5 viewports, and the footer lives inside the
 * stage so the page ends on a held frame rather than scrolling past one.
 *
 * The three [data-sc-cue] values stagger the headline, the alt line and the
 * signature across the pin.
 */
export function CloseAct() {
  return (
    <section id="watch" data-sc-act="pin" data-sc-span="1.5">
      <div data-sc-stage className="nh-close">
        <div className="nh-close__inner">
          <h2
            className="sc-display"
            data-sc-cue="0 1 0 0"
            data-nh-flow
            data-nh-flow-step="90"
          >
            New YouTube videos every week.
          </h2>
          <p data-sc-cue="0 1 0 0">
            <a
              className="nh-btn nh-btn--lg"
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon size={16} />
              Watch on YouTube
            </a>
          </p>
          <p
            className="nh-close__alt"
            data-sc-cue="0.05 1 0.25 0"
            data-nh-flow
          >
            Or{" "}
            <a
              className="nh-link"
              href={LINKS.society}
              target="_blank"
              rel="noopener noreferrer"
            >
              join AI Automation Society
            </a>
            . It&apos;s free.
          </p>
          <img
            className="nh-close__sig"
            src={`${ASSETS}/images/signature.png`}
            width={800}
            height={178}
            alt="Nate Herkelman's signature."
            data-sc-cue="0.12 1 0.3 0"
            loading="lazy"
          />
        </div>

        <footer className="nh-foot">
          <span className="nh-mark">
            <img
              src={`${ASSETS}/images/logo.png`}
              alt=""
              width={24}
              height={24}
            />
            <span>
              Nate Herk<i>.</i>
            </span>
          </span>
          <nav className="nh-social" aria-label="Social">
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer">
              X
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </nav>
          <small>© 2026 Nate Herk™</small>
          <a className="nh-foot__terms" href="/terms-of-access">
            Terms of Access
          </a>
        </footer>
      </div>
    </section>
  );
}
