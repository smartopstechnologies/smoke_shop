/** @type {import('next').NextConfig} */
const useCustomDomain = false // set to false to deploy under /smoke_shop on GitHub Pages
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd && !useCustomDomain ? '/smoke_shop' : ''

const nextConfig = {
  output: 'export',
  ...(basePath && { basePath }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
