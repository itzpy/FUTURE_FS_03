/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
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
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
