// app/layout.tsx
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | ProjectFlow',
    default: 'ProjectFlow - Project Management Dashboard'
  },
  description: 'A comprehensive project management application with team collaboration, task tracking, and analytics.',
  keywords: ['project management', 'collaboration', 'productivity', 'dashboard', 'team'],
  authors: [{ name: 'ProjectFlow Team' }],
  creator: 'ProjectFlow',
  metadataBase: new URL('https://projectflow.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://projectflow.com',
    siteName: 'ProjectFlow',
    title: 'ProjectFlow - Project Management Dashboard',
    description: 'Streamline your projects with our comprehensive management dashboard.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProjectFlow Dashboard'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@projectflow',
    creator: '@projectflow',
    title: 'ProjectFlow - Project Management Dashboard',
    description: 'Streamline your projects with our comprehensive management dashboard.',
    images: ['/og-image.png']
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className="dark" 
      suppressHydrationWarning
      style={{
        colorScheme: 'dark',
      }}
    >
      <head>
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
      )}>
        <div vaul-drawer-wrapper="">
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}