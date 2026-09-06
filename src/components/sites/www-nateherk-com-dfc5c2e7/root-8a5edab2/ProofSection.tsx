import { ArrowUpRightIcon } from "../shared/icons";
import { REGISTRY_ROWS, TRUST_LOGOS } from "./content";

/**
 * Act 2 · CONFIDENCE — a flow act, not pinned.
 *
 * `[data-nh-depth]` on the plane raises it out of depth as it enters the lower
 * half of the viewport. Each registry number counts up over 2.6s the first time
 * it intersects; the words beside it flow in behind them.
 */
export function ProofSection() {
  return (
    <section className="nh-section nh-section--first" data-sc-act="flow">
      <div className="nh-plane" data-nh-depth>
        <div className="nh-proof__head">
          <h2
            className="sc-display sc-display--lg"
            data-nh-flow
            data-nh-flow-step="80"
          >
            What I&apos;m up to
          </h2>
          <p className="sc-lede" data-nh-flow data-nh-flow-delay="240">
            Building in public across platforms. Here&apos;s where to find me.
          </p>
        </div>

        <div className="nh-reg">
          {REGISTRY_ROWS.map((row) => (
            <a
              key={row.label}
              className="nh-reg__row"
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nh-reg__n">
                <span data-nh-count={row.count} data-nh-count-dur="2600">
                  {row.display}
                </span>
                <i>+</i>
              </span>
              <span className="nh-reg__k" data-nh-flow>
                {row.label}
              </span>
              <span
                className="nh-reg__d"
                data-nh-flow
                data-nh-flow-delay="160"
              >
                {row.description}
              </span>
              <span className="nh-reg__go">
                <ArrowUpRightIcon size={16} strokeWidth={1.7} />
              </span>
            </a>
          ))}
        </div>

        <div className="nh-trust" data-sc-in>
          <p className="sc-label" data-nh-flow>
            Trusted by and featured in
          </p>
          <div className="nh-trust__row">
            {TRUST_LOGOS.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={logo.tall ? "is-tall" : undefined}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
