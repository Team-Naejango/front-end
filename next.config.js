/** @type {{output: string, transpilePackages: string[], images: {path: string, loader: string, unoptimized: boolean}, reactStrictMode: boolean, swcMinify: boolean}} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    loader: 'imgix',
    path: 'localhost:3000/*',
    unoptimized: true,
  },
  transpilePackages: ['@acme/ui', 'lodash-es', 'inline-react-svg'],
}

module.exports = nextConfig
