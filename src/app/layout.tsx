import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'

import './globals.css'
import { AppProvider } from './hooks/AppContext'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Brain',
  description: 'App by Gleyson',
  manifest: '/manifest.json',
  keywords: ['json viewer', 'technology', 'web application'],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-     fit=no, viewport-fit=cover'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AppProvider> {children}</AppProvider>{' '}
        </ThemeProvider>
      </body>
    </html>
  )
}
