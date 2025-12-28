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
  allowedDevOrigins: [
    'localhost',
    'mair.local'
  ],
};

export default nextConfig;
