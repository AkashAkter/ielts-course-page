import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "cdn.10minuteschool.com",
      "s3.ap-southeast-1.amazonaws.com",
      "img.youtube.com",
    ],
    unoptimized: true,
  },
};

export default nextConfig;
