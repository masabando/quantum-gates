/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  reactStrictMode: false,
  assetPrefix: "/quantum-gates",
  basePath: "/quantum-gates",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
