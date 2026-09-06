import { ROOM_PHOTOS } from "./content";

/**
 * Act 5 · PRESENCE — a pan act, 3.5 viewports long.
 *
 * The engine translates `#rail` sideways across the act's progress (the 0.05 on
 * [data-sc-pan] is the lead-in it holds before moving). On top of that the
 * runtime staggers each photo's `--nh-settle` from 0 to 1 on a 0.13-wide window
 * starting at 0.02 + i * 0.13, so frames arrive in sequence as they travel. The
 * first photo is exempt — it is already on screen when the act begins.
 */
export function RoomsAct() {
  return (
    <section id="rooms" data-sc-act="pan" data-sc-span="3.5">
      <div data-sc-stage className="nh-rail-stage">
        <div className="nh-rail" id="rail" data-sc-pan="0.05">
          <div className="nh-rail__lead nh-plate-soft">
            <h2 className="sc-display" data-nh-flow data-nh-flow-step="80">
              Same job in every room.
            </h2>
            <p className="sc-body" data-nh-flow data-nh-flow-delay="320">
              On YouTube, in the community, and on stage.
            </p>
          </div>

          {ROOM_PHOTOS.map((room) => (
            <figure
              key={room.src}
              className={`nh-room nh-room--${room.shape}`}
            >
              <div className="nh-room__frame">
                <img
                  src={room.src}
                  width={room.width}
                  height={room.height}
                  alt={room.alt}
                  loading="lazy"
                />
              </div>
              <figcaption data-nh-flow>{room.caption}</figcaption>
            </figure>
          ))}

          <div className="nh-rail__end">
            <p data-nh-flow>
              New YouTube videos every week, and a community that ships between
              them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
