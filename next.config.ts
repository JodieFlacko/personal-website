import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // The clone is verified by pixel comparison against the source site, and the
  // dev overlay sits on top of the page in the bottom-left corner.
  devIndicators: false,
};

export default nextConfig;
