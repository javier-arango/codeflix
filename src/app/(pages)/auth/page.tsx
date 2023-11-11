import Auth from '@components/Auth'
import NavBar from '@components/NavBar'

export default function AuthPage() {
  return (
    <main>
      <NavBar />
      <Auth />
    </main>
  )
}

// Display name
AuthPage.displayName = 'Authentication'
