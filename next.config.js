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
    disableStaticImages: true, // Disable static image optimization
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizeCss: false, // Disable CSS optimization
    craCompat: true, // Increase compatibility
    turbotrace: {
      logLevel: 'error'
    }
  }
}

module.exports = nextConfig
