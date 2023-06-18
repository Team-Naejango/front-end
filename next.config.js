/** @type {import('next').NextConfig} */

// const rewrites = async () => {
//   return [
//     {
//       source: '/:path*',
//       destination: 'http://43.202.25.203:8080/:path*',
//     },
//   ]
// }

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

module.exports = {
  rewrites: async () => {
    return [
      {
        source: '/:path*',
        destination: 'http://43.202.25.203:8080/:path*',
      },
    ]
  },
  nextConfig,
}
