/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/papers',
  assetPrefix: '/papers/',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
