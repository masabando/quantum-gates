import { NextConfig } from "next";

const nextConfig = {
  output: "export",
  reactStrictMode: false,
  assetPrefix: "/quantum-gates",
  basePath: "/quantum-gates",
  image: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
