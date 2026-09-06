import { FIGURES, type FigureKey } from "@/content/shared";

/**
 * A number the scroll runtime animates.
 *
 * The markup carries the target, the decimals and the pre-JS value; the
 * runtime reads `data-nh-count` (counts on first intersection) or
 * `data-nh-tick` (counts on load, for the hero, which is already on screen).
 * `data-nh-count-dec` is the addition this site needed: the original rounded
 * every value, which turns 2.55 into 3 and 4.38 into 4.
 *
 * `display` comes from the dictionary already formatted for its locale, so
 * the server-rendered value and the runtime's `toLocaleString` agree.
 */
export function Counter({
  figure,
  display,
  mode = "count",
  duration,
  delay,
}: {
  figure: FigureKey;
  display: string;
  /** `tick` counts on load; `count` waits until the number is on screen. */
  mode?: "count" | "tick";
  duration?: number;
  delay?: number;
}) {
  const { to, decimals, suffix } = FIGURES[figure];
  const attr = mode === "tick" ? "data-nh-tick" : "data-nh-count";

  return (
    <>
      <span
        {...{ [attr]: to }}
        data-nh-count-dec={decimals || undefined}
        data-nh-count-dur={mode === "count" ? duration : undefined}
        data-nh-tick-delay={mode === "tick" ? delay : undefined}
      >
        {display}
      </span>
      {suffix ? <i>{suffix}</i> : null}
    </>
  );
}
