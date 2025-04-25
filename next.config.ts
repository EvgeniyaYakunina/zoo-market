import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '47d9cd7f-3601bf4d-c134-424a-ac90-7d5ef6590a60.s3.timeweb.cloud',
        port: '', // если есть порт, укажите его, иначе оставьте пустым
        pathname: '/**', // разрешаем любые пути внутри бакета
      },
    ],
  },
}

export default nextConfig
