/** Inline SVGs. Sizes and stroke widths are passed through so each call site
 *  keeps the geometry the ported layout was measured against. */

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

/** Arrow breaking out of a box corner — marks an outbound link. */
export function ArrowUpRightIcon({
  size = 16,
  strokeWidth = 1.7,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** Straight arrow — continues to another page on the same site. */
export function ArrowRightIcon({
  size = 14,
  strokeWidth = 1.8,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Envelope — the primary call to action is an email, so this is the one icon
 *  on the page that was not in the reference set. Same 24-unit grid and stroke
 *  vocabulary as the arrows above. */
export function MailIcon({
  size = 16,
  strokeWidth = 1.7,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
