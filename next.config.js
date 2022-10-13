/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  basePath: '/hand-gesture-recognition-using-mediapipe-in-react',
  assetPrefix: '/hand-gesture-recognition-using-mediapipe-in-react',
  webpack: (config) => {
    const cvConfig = {
      fallback: {
        fs: false,
        path: false,
        crypto: false,
      },
    };
    config = { ...config, resolve: { ...config.resolve, ...cvConfig } };
    return config;
  },
};

module.exports = nextConfig;
