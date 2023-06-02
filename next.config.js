/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  output: 'export',
  images: {
    loader: 'imgix',
    path: '/',
  },
}

module.exports = nextConfig
