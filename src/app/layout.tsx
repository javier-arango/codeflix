import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@styles/globals.scss'

const roboto = Roboto({weight: "400", style: "normal", subsets: ["latin"]});

export const metadata: Metadata = {
  title: 'Codeflix',
  description:
    'Codeflix aims to be the ultimate destination for movie enthusiasts, providing a comprehensive and interactive platform to explore, review, and watch films.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}

// Display name
RootLayout.displayName = 'RootLayout'
