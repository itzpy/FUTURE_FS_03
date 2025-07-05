import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://abibas-rebrand.vercel.app/sitemap.xml', // Replace with your production URL
  }
}
