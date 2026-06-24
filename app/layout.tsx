import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tiger BioSciences × Bttr — The Full Picture',
  description: 'Six months of work, the platform we built, and the path forward.',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
