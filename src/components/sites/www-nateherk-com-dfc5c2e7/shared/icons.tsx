/** Inline SVGs extracted verbatim from nateherk.com. Sizes and stroke widths
 *  are passed through so each call site keeps the source's exact geometry. */

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

/** Solid play triangle — YouTube CTAs. */
export function PlayIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

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
