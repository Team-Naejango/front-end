/** @type {(function({}=): function({}=): *)|{}} */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const webPush = require('web-push')

const vapidKeys = webPush.generateVAPIDKeys()
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
  /// <reference types="webpack" />
  webpack: (config, { webpack: { IgnorePlugin } }) => {
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /aws-crt/,
        contextRegExp: /aws-sdk/,
      })
    )
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },
  pwa: {
    // disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
    skipWaiting: true,
    customWorkerDir: 'worker',
    runtimeCaching,
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  },
}

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    importScripts: ['/worker/index.ts'],
  },
})
