// next.config.js
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
}

module.exports = nextConfig
