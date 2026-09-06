import { ArrowUpRightIcon } from "../shared/icons";
import { ASSETS, BOOK_CATEGORIES, LINKS } from "./content";

/**
 * Act 6 · DELIGHT — a flow act.
 *
 * The cover plate carries `[data-nh-wipe]`: the runtime drives a clip-path
 * `inset(N% 0 0 0 round 6px 14px 14px 6px)` from 100% to 0 as it enters, so the
 * jacket wipes up from its own base rather than fading in. Once complete the
 * inline clip-path is cleared so the sheen highlight can overflow again.
 */
export function BookSection() {
  return (
    <section className="nh-section" data-sc-act="flow">
      <div className="nh-plane nh-book" data-nh-depth>
        <figure className="nh-book__art">
          <span className="nh-book__glow" aria-hidden="true" />
          <div className="nh-book__plate" data-nh-wipe>
            <img
              src={`${ASSETS}/images/book-cover.webp`}
              width={880}
              height={1466}
              alt="Becoming AI Native by Nate Herk, standing hardcover."
              loading="lazy"
            />
            <span className="nh-book__sheen" aria-hidden="true" />
          </div>
        </figure>
        <div className="sc-stack">
          <p className="sc-label" data-nh-flow>
            #1 Amazon Bestseller
          </p>
          <h2
            className="sc-display"
            data-nh-flow
            data-nh-flow-delay="120"
            data-nh-flow-step="90"
          >
            Becoming AI Native
          </h2>
          <p className="sc-lede" data-nh-flow data-nh-flow-delay="360">
            Use AI to get real results without the busywork.
          </p>
          <p className="sc-body" data-nh-flow data-nh-flow-delay="520">
            Nate&apos;s first book, now a #1 Amazon bestseller. One framework
            for putting AI to work, built to outlast every tool that comes
            after it.
          </p>
          <p className="sc-label" data-nh-flow data-nh-flow-delay="700">
            #1 Bestseller in
          </p>
          <ul className="nh-book__cats" data-nh-flow data-nh-flow-delay="800">
            {BOOK_CATEGORIES.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
          <p
            className="nh-book__cta"
            data-nh-flow="block"
            data-nh-flow-delay="1000"
          >
            <a
              className="nh-btn"
              href={LINKS.amazon}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy on Amazon
              <ArrowUpRightIcon size={14} strokeWidth={1.8} />
            </a>
            <a
              className="nh-link"
              href={LINKS.amazonReview}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave a review
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
