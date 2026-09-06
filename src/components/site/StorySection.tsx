import { getDictionary } from "@/content/dictionaries";

import { Placeholder } from "./Placeholder";
import { Rich } from "./Rich";
import { ArrowRightIcon } from "./icons";

/**
 * Act 4 · INTIMACY — a flow act, and the `#about` anchor.
 *
 * The plane and each photograph carry their own `[data-nh-depth]`, with
 * per-element travel (70px for the first slot, 110px for the second) so the
 * two rise out of depth at different rates beside the prose.
 *
 * Written from the record and nothing else. There is no personal biography in
 * the portfolio repository and none was invented for this: what is here is the
 * delivery record, the client's shape, and why one of the four systems carries
 * a number and the others do not.
 */
export async function StorySection() {
  const { story, slotNote } = await getDictionary();

  return (
    <section id="about" className="nh-section" data-sc-act="flow">
      <div className="nh-plane nh-story" data-nh-depth>
        <div>
          <h2 className="sc-display" data-nh-flow data-nh-flow-step="60">
            {story.heading}
          </h2>
          <div className="nh-story__text">
            {story.paragraphs.map((paragraph, i) => (
              <p key={i} data-nh-flow>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
          <p className="nh-story__more" data-nh-flow="block">
            <a className="nh-btn nh-btn--ghost" href="#work">
              {story.cta}
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
            <Placeholder label={story.slots[0]} note={slotNote} />
          </figure>
          <figure
            className="nh-ph nh-ph--office"
            data-nh-depth
            data-nh-depth-travel="110"
          >
            <Placeholder label={story.slots[1]} note={slotNote} />
          </figure>
        </div>
      </div>
    </section>
  );
}
