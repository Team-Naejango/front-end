/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
