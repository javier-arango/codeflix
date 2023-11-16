'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
interface Props {
  children?: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  )
}

// Display name
Providers.displayName = 'Providers'
