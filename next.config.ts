import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* this folder sits inside another npm project; keep tracing scoped to the app */
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
