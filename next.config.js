/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'export',
  images: {
    domains: ['d1ad0vl3i2dudp.cloudfront.net', 'localhost:3000'],
  },
}

module.exports = nextConfig
