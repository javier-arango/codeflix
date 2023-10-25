/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // Sass configuration
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
    prependData: `@import "main.scss";`,
  },
  // Only accepts images from image.tmdb.org
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

module.exports = nextConfig;
