/** The wordmark.
 *
 *  Text only, and deliberately: no logo file exists, and a generated one would
 *  be an invented asset on a site whose whole argument is that nothing on it
 *  is invented. The accent full stop is the mark.
 *
 *  The given name is a separate span so the docked pill — which carries five
 *  things on a phone — can drop it and still show a mark. */
export function SiteMark() {
  return (
    <span className="nh-mark__text">
      <span className="nh-mark__given">Giuseppe </span>Ciccone<i>.</i>
    </span>
  );
}
