import './globals.css'

export const metadata = {
  title: 'Abibas - Performance Sportswear',
  description: 'Modern sportswear brand focused on performance and style',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
