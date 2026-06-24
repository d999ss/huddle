import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tiger BioSciences × Bttr — Partnership Forward',
  description: 'Partnership-forward presentation.',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
