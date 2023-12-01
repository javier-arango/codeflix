import { Footer } from '@components/Footer'
import { AppNavBar } from '@components/NavBar'
import '@styles/globals.css'
import type { Metadata } from 'next'
import type { Session } from 'next-auth'
import { getServerSession } from 'next-auth'
import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Providers } from './providers'

const roboto = Roboto({ weight: '400', style: 'normal', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Codeflix',
  description:
    'Codeflix aims to be the ultimate destination for movie enthusiasts, providing a comprehensive and interactive platform to explore, review, and watch films.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get user session
  const session: Session | null = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <Providers>
          <Toaster
            toastOptions={{
              duration: 2000, // toast will last 2 seconds
            }}
          />
          <AppNavBar initialSession={session} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

// Display name
RootLayout.displayName = 'RootLayout'
