/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Remove experimental config since we're using app directory by default
}

module.exports = nextConfig