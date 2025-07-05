/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
      'picsum.photos', 
      'placehold.co',
      'via.placeholder.com',
      'source.unsplash.com',
      'plus.unsplash.com'
    ],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
