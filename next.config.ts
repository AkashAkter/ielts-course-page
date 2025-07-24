import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Helps catch bugs early
  swcMinify: true, // Fast build & minification
  experimental: {
    serverActions: true, // Useful if you plan to use Server Components or Actions
  },
  i18n: {
    locales: ["en", "bn"], // Supported languages
    defaultLocale: "en", // Default language
  },
};

export default nextConfig;
