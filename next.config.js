/** @type {{output: string, transpilePackages: string[], images: {path: string, loader: string}, reactStrictMode: boolean, swcMinify: boolean, env: {NEXT_PUBLIC_TEST: number}}} */

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
