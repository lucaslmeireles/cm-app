/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
      protocol: "http",
      hostname: "20.206.205.45"
      }
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "ideal-space-capybara-5pv949j4xxq3p7wx-5000.app.github.dev",
      ],
      allowedForwardedHosts: [
        "localhost:3000",
        "ideal-space-capybara-5pv949j4xxq3p7wx-5000.app.github.dev",
      ],
    },
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
export default withNextIntl(nextConfig);