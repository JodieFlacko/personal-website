/**
 * Fixed page furniture that sits outside <main>, in source order:
 *
 *  - #glass   one WebGL pane behind everything. The runtime binds scroll
 *             position, scroll velocity and the ring's angle to its uniforms.
 *  - .sc-grain  a fractal-noise overlay at 3% (the texture is a CSS data-URI).
 *  - .nh-progress  one brand-blue hairline across the top, filled as the page
 *             is read. Driven by the engine via [data-sc-progress].
 */
export function GlassBackdrop() {
  return (
    <>
      <canvas id="glass" className="nh-glass" aria-hidden="true" />
      <div className="sc-grain" aria-hidden="true" />
      <div className="nh-progress" data-sc-progress aria-hidden="true" />
    </>
  );
}
