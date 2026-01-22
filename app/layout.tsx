import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const _jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'Filipe Silveira | Cybersecurity Expert & Pentester',
  description: 'Portfolio of Filipe de Castro Borges da Silveira - Offensive Security Expert, OSCP+, Pentester, Cloud Security Specialist. Explore my experience in cybersecurity auditing, penetration testing, and security research.',
  keywords: ['cybersecurity', 'pentester', 'OSCP', 'security audit', 'penetration testing', 'offensive security', 'cloud security'],
  authors: [{ name: 'Filipe de Castro Borges da Silveira' }],
  openGraph: {
    title: 'Filipe Silveira | Cybersecurity Expert & Pentester',
    description: 'Offensive Security Expert, OSCP+, Pentester, Cloud Security Specialist',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
