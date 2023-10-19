/** @type {(function({}=): function({}=): *)|{}} */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

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
  webpack: (config, { webpack: { IgnorePlugin }, isServer, nextRuntime }) => {
    if (isServer && nextRuntime === 'nodejs')
      config.plugins.push(
        new IgnorePlugin({
          resourceRegExp: /^(aws-crt|@aws-sdk\/signature-v4-crt)$/,
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
    dest: 'public',
    register: true,
    skipWaiting: true,
    customWorkerDir: 'worker',
    runtimeCaching,
  },
}

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    importScripts: ['/worker/index.ts'],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  },
})
