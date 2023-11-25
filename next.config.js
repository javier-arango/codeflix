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
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dp28illl8/**', // Adjust the pathname according to your use case
      },
    ],
  },
}

module.exports = nextConfig
