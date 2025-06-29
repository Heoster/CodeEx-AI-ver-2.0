/** @type {import('next').NextConfig} */Add commentMore actions
const nextConfig = {

  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
@@ -18,5 +19,3 @@ const nextConfig = {
    ],
  },
};

module.exports = nextConfig;
