'use client'

import { Button } from '@components/foundation'
import { signOut } from 'next-auth/react'

interface HomeProps {
  userName: string
}

export const NavBar = ({ userName }: HomeProps) => {
  return (
    <div>
      <div>
        <h1>Cinemify - Home Page</h1>
        <h2>Welcome {userName} </h2>
      </div>

      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}

// Display name
NavBar.displayName = 'NavBar'
