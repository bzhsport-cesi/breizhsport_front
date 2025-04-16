import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['placehold.co', 'localhost'], // Remplace par le domaine des images
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
