/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable problematic features for compatibility
  swcMinify: false,
}

module.exports = nextConfig
