import { getDictionary } from "@/content/dictionaries";

import { Counter } from "./Counter";
import { Rich } from "./Rich";

/**
 * Act 2 · CONFIDENCE — a flow act, not pinned.
 *
 * `[data-nh-depth]` on the plane raises it out of depth as it enters the lower
 * half of the viewport. Each figure counts up over 2.6s the first time it
 * intersects; the words beside it flow in behind them.
 *
 * The reference site's registry counted totals — subscribers, members — and
 * every row was an outbound link. These are deltas, and there is nowhere to
 * link to: the evidence for them is in a private repository. So the row grew a
 * *from → to* pair on the left, and the arrow column that marked an outbound
 * link now carries how solid the row is. That column is not decoration. The
 * difference between a measurement, a check and the client's own operating
 * figure is the argument this page is making, and burying it in the prose
 * would be the same mistake as dropping the caveats.
 */
export async function ResultsSection() {
  const { results } = await getDictionary();

  return (
    <section className="nh-section nh-section--first" data-sc-act="flow">
      <div className="nh-plane" data-nh-depth>
        <div className="nh-proof__head">
          <h2
            className="sc-display sc-display--lg"
            data-nh-flow
            data-nh-flow-step="80"
          >
            {results.heading}
          </h2>
          <p className="sc-lede" data-nh-flow data-nh-flow-delay="240">
            {results.lede}
          </p>
        </div>

        <div className="nh-reg">
          {results.rows.map((row) => (
            <div className="nh-reg__row" key={row.figure}>
              <span className="nh-reg__n">
                {row.from ? (
                  <>
                    <span className="nh-reg__from">{row.from}</span>
                    <span className="nh-reg__arrow" aria-hidden="true">
                      →
                    </span>
                  </>
                ) : null}
                <span className="nh-reg__to">
                  <Counter
                    figure={row.figure}
                    display={row.display}
                    duration={2600}
                  />
                </span>
              </span>
              <span className="nh-reg__k" data-nh-flow>
                {row.label}
              </span>
              <span className="nh-reg__d" data-nh-flow data-nh-flow-delay="160">
                <Rich text={row.description} />
              </span>
              <span className="nh-reg__tag">{row.tag}</span>
            </div>
          ))}
        </div>

        {/* Where the reference site put a wall of partner logos. One client is
            not a logo wall, and a row of tech logos dressed as endorsement
            would be the invented detail this whole page is built against. The
            fourth number goes here instead — the one that is an estimate, said
            so, in the same breath. */}
        <div className="nh-note" data-sc-in>
          <p className="sc-label" data-nh-flow>
            {results.noteLabel}
          </p>
          <p className="nh-note__body" data-nh-flow data-nh-flow-delay="140">
            <Rich text={results.note} />
          </p>
        </div>
      </div>
    </section>
  );
}
