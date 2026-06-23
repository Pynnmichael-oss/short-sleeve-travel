import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/short-sleeve-travel',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['mapbox-gl'],
};

export default nextConfig;
