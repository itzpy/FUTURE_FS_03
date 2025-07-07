/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports
  images: {
    domains: [
      'images.unsplash.com',
      'picsum.photos', 
      'placehold.co',
      'via.placeholder.com',
      'source.unsplash.com',
      'plus.unsplash.com',
      'bjgkzymtpcajejcywlht.supabase.co' // Supabase storage domain
    ],
    unoptimized: true, // Required for static export
  },
  // Remove experimental flags for compatibility
  swcMinify: false, // Disable SWC minifier 
  compiler: {
    removeConsole: false,
  }
}

module.exports = nextConfig
