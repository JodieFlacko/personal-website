import { getDictionary } from "@/content/dictionaries";

import { Placeholder } from "./Placeholder";

/**
 * Act 3 · AWE — pinned for 3.4 viewports, the longest act on the page.
 *
 * Seven plates sit on a 3D carousel; each is parked at `--nh-a = i * 360/N`.
 * Scroll turns the ring by `-p * (360 * (N-1)/N)`, so the last plate lands
 * front and centre exactly as the act ends. The runtime also fades and hides
 * back-facing plates, leans the whole ring toward the pointer, and rotates the
 * glass pane behind it while the act is on screen.
 *
 * The reference site held awards here. Giuseppe has none, and the ring holds
 * exactly seven plates, so it carries the seven capability claims instead —
 * area, the claim, and the shipped work that evidences it. Nothing on a plate
 * is an intention: every one names a system that is running.
 *
 * The plates do not link out. They did on the reference site, where each was a
 * press mention with a URL; here the evidence is a private repository and an
 * invented link would be worse than none.
 */
export async function CapabilityRing() {
  const { capabilities, slotNote } = await getDictionary();

  return (
    <section id="capabilities" data-sc-act="pin" data-sc-span="3.4">
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
            {capabilities.heading}
          </h2>
          <p className="sc-body" data-nh-flow data-nh-flow-delay="300">
            {capabilities.body}
          </p>
        </div>

        <div className="nh-ring__scene" aria-label={capabilities.heading}>
          {/* Sits beside the ring rather than inside it, so it holds still
              while the plates turn around it. */}
          <figure className="nh-ring__centre" id="ringCentre">
            <Placeholder label={capabilities.centreSlot} note={slotNote} />
          </figure>
          <div className="nh-ring" id="ring">
            {capabilities.plates.map((plate) => (
              <article className="nh-plate" key={plate.area}>
                <div className="nh-plate__in" data-sc-tilt="6">
                  <span className="nh-plate__src" data-nh-flow>
                    {plate.area}
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
                    {plate.proof}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p
          className="nh-ring__caption"
          data-sc-cue="0.06 1 0.12 0.12"
          data-nh-flow
        >
          {capabilities.caption}
        </p>
      </div>
    </section>
  );
}
