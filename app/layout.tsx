import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'luso日本語 | Coming Soon',
  description: 'Aprende japonês com conteúdo feito para falantes de português.',
  keywords: ['japonês', 'português', 'aprender japonês', 'língua japonesa', 'nihongo'],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'luso日本語 | Coming Soon',
    description: 'Aprende japonês com conteúdo feito para falantes de português.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
