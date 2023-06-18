/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    loader: 'imgix',
    path: '/',
  },
  transpilePackages: ['@acme/ui', 'lodash-es', 'inline-react-svg'],
}

module.exports = nextConfig
