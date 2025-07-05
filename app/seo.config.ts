const SEO = {
  title: 'Abibas - Performance Sportswear Reimagined',
  description: 'Experience the future of sportswear with Abibas. AI-powered performance meets premium design in our modern athletic products.',
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
    handle: '@abibas',
    site: '@abibas',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'msapplication-TileColor',
      content: '#22c55e',
    },
    {
      name: 'msapplication-tap-highlight',
      content: 'no',
    },
    {
      name: 'theme-color',
      content: '#22c55e',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
}

export default SEO
