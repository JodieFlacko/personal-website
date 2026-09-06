/**
 * An image slot with no image in it yet.
 *
 * Every photograph on this page is outstanding. The engine measures act
 * heights off the DOM to compute its pin maths, so an empty or collapsed slot
 * does not just look wrong — it moves the scroll geometry, and the page stops
 * matching the reference. This fills its parent exactly, and the parent is
 * what holds the ratio: `.nh-room__frame` its `aspect-ratio`,
 * `.nh-ring__centre` its square, `.nh-hero__portrait` its `svh` height. Drop a
 * real `<img>` in beside it later and nothing else has to move.
 *
 * It says what it is waiting for rather than pretending to be a picture.
 */
export function Placeholder({
  label,
  note,
  variant,
}: {
  /** The subject the slot is holding a place for. */
  label: string;
  /** Optional second line, smaller and quieter. */
  note?: string;
  /** `portrait` takes the hero's rounded silhouette instead of a rectangle. */
  variant?: "portrait";
}) {
  return (
    <span className={variant ? `nh-slot nh-slot--${variant}` : "nh-slot"}>
      <span className="nh-slot__label">{label}</span>
      {note ? <span className="nh-slot__note">{note}</span> : null}
    </span>
  );
}
