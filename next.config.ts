import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GreenGeeks/Apache redirects /about → /about/; without this, export is about.html and /about/ 404s.
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
