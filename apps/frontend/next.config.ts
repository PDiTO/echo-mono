import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@repo/db', '@repo/types', '@repo/utils'],
};

export default nextConfig;
