import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Apple Reimagined - Modern Tech Experience',
  description: 'Experience Apple like never before with our AI-powered redesign featuring cutting-edge technology, innovative design, and seamless user experience.',
  keywords: ['Apple', 'technology', 'innovation', 'design', 'AI', 'modern'],
  authors: [{ name: 'Apple Reimagined Team' }],
  openGraph: {
    title: 'Apple Reimagined - Modern Tech Experience',
    description: 'Experience Apple like never before with our AI-powered redesign',
    url: 'https://apple-reimagined.vercel.app',
    siteName: 'Apple Reimagined',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apple Reimagined',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apple Reimagined - Modern Tech Experience',
    description: 'Experience Apple like never before with our AI-powered redesign',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
