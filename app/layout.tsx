import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ace Smoke Shop — Woodbury Heights, NJ',
  description:
    'Premier smoke & vape shop in Woodbury Heights NJ. Glass pieces, vapes, hookah, cigars, CBD & accessories. 4.7★ rated. Open 7 days a week.',
  keywords:
    'smoke shop, vape shop, hookah, glass pipes, cigars, CBD, Woodbury Heights NJ, disposable vapes, nicotine salts, dab rigs',
  authors: [{ name: 'SmartOps Technologies', url: 'https://www.smartopstechnologies.com' }],
  openGraph: {
    title: 'Ace Smoke Shop — Woodbury Heights, NJ',
    description: 'Premier smoke & vape destination. 4.7★ rated. Open 7 days.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#b85c18',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
