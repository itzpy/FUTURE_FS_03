import React from 'react';
import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { DefaultSeo } from 'next-seo'
import SEO from './seo.config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://abibas-future.vercel.app'),
  title: 'Abibas - Performance Sportswear Reimagined',
  description: 'Experience the future of sportswear with Abibas. AI-powered performance meets premium design in our modern athletic products.',
  keywords: 'sportswear, athletic shoes, performance apparel, sports equipment, activewear',
  authors: [{ name: 'Abibas Team' }],
  creator: 'Abibas',
  publisher: 'Abibas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abibas.com',
    siteName: 'Abibas',
    title: 'Abibas - Performance Sportswear Reimagined',
    description: 'Experience the future of sportswear with Abibas. AI-powered performance meets premium design in our modern athletic products.',
    images: [
      {
        url: 'https://abibas.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abibas - Performance Sportswear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abibas - Performance Sportswear Reimagined',
    description: 'Experience the future of sportswear with Abibas. AI-powered performance meets premium design in our modern athletic products.',
    creator: '@abibas',
    images: ['https://abibas.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <DefaultSeo {...SEO} />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}
