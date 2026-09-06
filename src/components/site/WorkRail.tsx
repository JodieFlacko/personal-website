import { getDictionary } from "@/content/dictionaries";
import { LINKS, PROJECT_FRAMES } from "@/content/shared";

import { ArrowUpRightIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { Rich } from "./Rich";

/**
 * Act 5 · PRESENCE — a pan act, 3.5 viewports long, and the `#work` anchor.
 *
 * The engine translates `#rail` sideways across the act's progress (the 0.05
 * on [data-sc-pan] is the lead-in it holds before moving). On top of that the
 * runtime staggers each card's `--nh-settle` from 0 to 1 on a 0.13-wide window
 * starting at 0.02 + i * 0.13, so cards arrive in sequence as they travel. The
 * first is exempt — it is already on screen when the act begins, which is why
 * the measured system leads.
 *
 * The reference site panned six photographs past. This pans the five systems:
 * each keeps the photo frame (so a screenshot drops straight in without moving
 * the rail's geometry) and gains a body reading problem → built → changed, the
 * order every project page in the record follows.
 *
 * `mexal` is the one card with real imagery today: two redacted crops from the
 * delivered skill bundle. It sizes to them rather than to a ratio.
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
              <article
                className={`nh-room nh-work nh-room--${frame.shape}`}
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
                {project.caption ? (
                  <p className="nh-work__caption" data-nh-flow>
                    {project.caption}
                  </p>
                ) : null}

                <div className="nh-work__body nh-plate-soft">
                  <p className="nh-work__kind" data-nh-flow>
                    {project.kind}
                  </p>
                  <h3 className="nh-work__title" data-nh-flow>
                    {project.title}
                  </h3>
                  <dl className="nh-work__lines">
                    <div>
                      <dt>{work.labels.problem}</dt>
                      <dd data-nh-flow>
                        <Rich text={project.problem} />
                      </dd>
                    </div>
                    <div>
                      <dt>{work.labels.built}</dt>
                      <dd data-nh-flow>
                        <Rich text={project.built} />
                      </dd>
                    </div>
                    <div>
                      <dt>{work.labels.changed}</dt>
                      <dd data-nh-flow>
                        <Rich text={project.changed} />
                      </dd>
                    </div>
                  </dl>
                  <p className="nh-work__stack">
                    <span>{work.labels.stack}</span> {frame.stack}
                  </p>
                </div>
              </article>
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
