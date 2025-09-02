/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  basePath: '',
  assetPrefix: '',
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

module.exports = nextConfig
