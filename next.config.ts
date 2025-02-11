import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.app.goo.gl"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;