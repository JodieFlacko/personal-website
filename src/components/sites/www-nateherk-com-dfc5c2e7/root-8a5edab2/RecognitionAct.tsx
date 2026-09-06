import { ArrowUpRightIcon } from "../shared/icons";
import { ASSETS, AWARD_PLATES } from "./content";

/**
 * Act 3 · AWE — pinned for 3.4 viewports, the longest act on the page.
 *
 * Seven plates sit on a 3D carousel; each is parked at `--nh-a = i * 360/N`.
 * Scroll turns the ring by `-p * (360 * (N-1)/N)`, so the last plate lands
 * front and centre exactly as the act ends. The runtime also fades and hides
 * back-facing plates, leans the whole ring toward the pointer, and rotates the
 * glass pane behind it while the act is on screen.
 *
 * The trophy photo sits beside the ring rather than inside it, so it holds
 * still while the plates turn around it.
 */
export function RecognitionAct() {
  return (
    <section id="recognition" data-sc-act="pin" data-sc-span="3.4">
      <div
        data-sc-stage
        className="nh-ring-stage"
        data-sc-verify-state="ring:0"
      >
        <div className="sc-copy nh-ring__copy" data-sc-cue="0 1 0 0.12">
          <h2
            className="sc-display sc-display--md"
            data-nh-flow
            data-nh-flow-step="90"
          >
            Recognition
          </h2>
          <p className="sc-body" data-nh-flow data-nh-flow-delay="300">
            Awards and features from the AI automation ecosystem.
          </p>
        </div>

        <div className="nh-ring__scene" aria-label="Awards and press">
          <figure className="nh-ring__centre" id="ringCentre">
            <img
              src={`${ASSETS}/images/skool-win.webp`}
              alt="Nate Herk holding a Skool Games trophy."
              loading="lazy"
            />
          </figure>
          <div className="nh-ring" id="ring">
            {AWARD_PLATES.map((plate) => {
              const inner = (
                <>
                  {plate.badge ? (
                    <img
                      className="nh-plate__badge"
                      src={plate.badge.src}
                      alt={plate.badge.alt}
                      loading="lazy"
                    />
                  ) : null}
                  <span className="nh-plate__src" data-nh-flow>
                    {plate.source}
                  </span>
                  <span
                    className="nh-plate__title"
                    data-nh-flow
                    data-nh-flow-delay="120"
                  >
                    {plate.title}
                  </span>
                  <span
                    className="nh-plate__sub"
                    data-nh-flow
                    data-nh-flow-delay="260"
                  >
                    {plate.subtitle}
                  </span>
                  {plate.href ? (
                    <ArrowUpRightIcon
                      size={16}
                      strokeWidth={1.7}
                      className="nh-plate__go"
                    />
                  ) : null}
                </>
              );

              return (
                <article className="nh-plate" key={plate.source}>
                  {plate.href ? (
                    <a
                      className="nh-plate__in"
                      href={plate.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-sc-tilt="6"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="nh-plate__in" data-sc-tilt="6">
                      {inner}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <p
          className="nh-ring__caption"
          data-sc-cue="0.06 1 0.12 0.12"
          data-nh-flow
        >
          Winning the Skool Games, one of four consecutive wins for AI
          Automation Society.
        </p>
      </div>
    </section>
  );
}
