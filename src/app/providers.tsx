'use client'

import { SessionProvider } from 'next-auth/react'

interface Props {
  children?: React.ReactNode
}

export function Providers({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}

// Display name
Providers.displayName = 'Providers'
