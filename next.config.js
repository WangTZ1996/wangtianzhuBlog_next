/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.wangtz.cn',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
}

module.exports = nextConfig
