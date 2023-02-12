const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [{ from: 'node_modules/kuromoji/dict', to: 'dictionary' }],
      }),
    )

    // Important: return the modified config
    return config
  },
}

module.exports = nextConfig
