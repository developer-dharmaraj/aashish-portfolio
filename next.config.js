/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow font fetching to fail gracefully in restricted environments
  experimental: {
    optimizePackageImports: ['gsap'],
  },
}
module.exports = nextConfig
