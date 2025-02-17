import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ir-3.ozone.ru',
      },
      {
        protocol: 'https',
        hostname: 'giperzoo.by',
      },
      {
        protocol: 'https',
        hostname: 'cs1.livemaster.ru',
      },
      {
        protocol: 'https',
        hostname: 'img.moyo.ua',
      },
      {
        protocol: 'https',
        hostname: 'catalog.detmir.st',
      },
    ],
  },
}

export default nextConfig
