/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/breathbeaver',
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
