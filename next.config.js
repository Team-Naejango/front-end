/** @type {(function({}=): function({}=): *)|{}} */

// const withPWA = require('next-pwa')
// const runtimeCaching = require('next-pwa/cache')
//
// const webPush = require('web-push')

// const vapidKeys = webPush.generateVAPIDKeys()
// console.log(vapidKeys)

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
  // pwa: {
  //   // disable: process.env.NODE_ENV === 'development',
  //   dest: 'public',
  //   register: true,
  //   skipWaiting: true,
  //   runtimeCaching,
  //   customWorkerDir: 'worker',
  // },
}

// module.exports = withPWA(nextConfig, {
//   dest: 'public',
//   importScripts: ['/worker.ts'],
// })

module.exports = nextConfig
