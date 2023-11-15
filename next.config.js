/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // Sass configuration
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    prependData: `@import "main.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],
  },
}

module.exports = nextConfig
