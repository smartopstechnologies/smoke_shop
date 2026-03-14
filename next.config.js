/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Update basePath if deploying to a GitHub Pages sub-path.
  // For a custom domain (e.g. acesmokeshopnj.com), remove the basePath line entirely.
  // basePath: '/Smokeshop_WebApp',
  images: {
    unoptimized: true,
    // All images are now served from /public/images/ — no external CDNs needed.
  },
}

module.exports = nextConfig
