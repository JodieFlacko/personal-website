import { ArrowRightIcon } from "../shared/icons";
import { ASSETS } from "./content";

/**
 * Act 4 · INTIMACY — a flow act.
 *
 * The plane and each photograph carry their own `[data-nh-depth]`, with
 * per-element travel (70px for the graduation shot, 110px for the studio) so
 * the two images rise out of depth at different rates beside the prose.
 */
export function StorySection() {
  return (
    <section className="nh-section" data-sc-act="flow">
      <div className="nh-plane nh-story" data-nh-depth>
        <div>
          <h2 className="sc-display" data-nh-flow data-nh-flow-step="60">
            I didn&apos;t come from a technical background, and you don&apos;t
            need to either.
          </h2>
          <div className="nh-story__text">
            <p data-nh-flow>
              Nate Herkelman (yes, that is his full name) is an AI automation
              creator and educator. He graduated from the University of Iowa
              with a double major in Business Analytics and Marketing.
            </p>
            <p data-nh-flow>
              After working as a Business Intelligence Analyst at Goldman Sachs,
              he transitioned out of the corporate world in November 2024 to
              build his own AI automation agency and education brand.
            </p>
            <p data-nh-flow>
              Today, he teaches people how to master AI agents, build
              automations, and turn those skills into real income while leading
              one of the largest AI automation communities in the world.
            </p>
          </div>
          <p className="nh-story__more" data-nh-flow="block">
            <a className="nh-btn nh-btn--ghost" href="/about">
              Read the full story
              <ArrowRightIcon size={14} strokeWidth={1.8} />
            </a>
          </p>
        </div>
        <div className="nh-story__photos">
          <figure
            className="nh-ph nh-ph--grad"
            data-nh-depth
            data-nh-depth-travel="70"
          >
            <img
              src={`${ASSETS}/images/grad.webp`}
              width={480}
              height={720}
              alt="Nate Herkelman in cap and gown outside the Old Capitol at the University of Iowa."
              loading="lazy"
            />
            <figcaption data-nh-flow>University of Iowa</figcaption>
          </figure>
          <figure
            className="nh-ph nh-ph--office"
            data-nh-depth
            data-nh-depth-travel="110"
          >
            <img
              src={`${ASSETS}/images/office.webp`}
              width={1600}
              height={900}
              alt="Nate Herk in his YouTube studio, an AIS neon sign behind him."
              loading="lazy"
            />
            <figcaption data-nh-flow>Nate&apos;s YouTube studio</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
