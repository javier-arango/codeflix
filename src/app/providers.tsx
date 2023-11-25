'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface Props {
  children?: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}

// Display name
Providers.displayName = 'Providers'
