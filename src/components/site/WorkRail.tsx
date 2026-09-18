import { getDictionary } from "@/content/dictionaries";
import { LINKS, PROJECT_FRAMES } from "@/content/shared";

import { ArrowUpRightIcon } from "./icons";
import { Placeholder } from "./Placeholder";

/**
 * Act 5 · PRESENCE — a pan act, 3.5 viewports long, and the `#work` anchor.
 *
 * The engine translates `#rail` sideways across the act's progress (the 0.05
 * on [data-sc-pan] is the lead-in it holds before moving). On top of that the
 * runtime staggers each frame's `--nh-settle` from 0 to 1 on a 0.13-wide window
 * starting at 0.02 + i * 0.13, so frames arrive in sequence as they travel. The
 * first is exempt — it is already on screen when the act begins.
 *
 * The reference site panned six photographs past, each with a one-line
 * caption. This pans the five systems the same way: a frame and the project's
 * title, nothing more. A screenshot drops into a frame later without the
 * rail's geometry moving.
 *
 * `mexal` is the one frame with real imagery today: two redacted crops from
 * the delivered skill bundle. It sizes to them rather than to a ratio.
 */
export async function WorkRail() {
  const { work, slotNote } = await getDictionary();

  return (
    <section id="work" data-sc-act="pan" data-sc-span="3.5">
      <div data-sc-stage className="nh-rail-stage">
        <div className="nh-rail" id="rail" data-sc-pan="0.05">
          <div className="nh-rail__lead nh-plate-soft">
            <h2 className="sc-display" data-nh-flow data-nh-flow-step="80">
              {work.leadHeading}
            </h2>
            <p className="sc-body" data-nh-flow data-nh-flow-delay="320">
              {work.leadBody}
            </p>
          </div>

          {work.projects.map((project) => {
            const frame = PROJECT_FRAMES[project.id];

            return (
              <figure
                className={`nh-room nh-room--${frame.shape}`}
                key={project.id}
              >
                <div className="nh-room__frame">
                  {frame.media ? (
                    frame.media.map((media, i) => (
                      <img
                        key={media.src}
                        src={media.src}
                        width={media.width}
                        height={media.height}
                        alt={project.mediaAlt?.[i] ?? ""}
                        loading="lazy"
                      />
                    ))
                  ) : (
                    <Placeholder label={project.slot ?? ""} note={slotNote} />
                  )}
                </div>
                <figcaption data-nh-flow>{project.title}</figcaption>
              </figure>
            );
          })}

          <div className="nh-rail__end">
            <p data-nh-flow>{work.end}</p>
            <p className="nh-rail__end-cta" data-nh-flow="block">
              <a
                className="nh-btn"
                href={LINKS.concierge}
                target="_blank"
                rel="noopener noreferrer"
              >
                {work.endCta}
                <ArrowUpRightIcon size={14} strokeWidth={1.8} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
