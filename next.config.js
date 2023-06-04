/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  output: 'export',
  images: {
    loader: 'imgix',
    path: '/',
  },
  transpilePackages: ['@acme/ui', 'lodash-es'],
}

module.exports = nextConfig
