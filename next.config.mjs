/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/breathbeaver',
  assetPrefix: '/breathbeaver/',
  output: 'export',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
