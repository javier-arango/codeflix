import NavBar from '@components/NavBar'
import Profile from '@components/Profile'

export default function ProfilePage() {
  return (
    <main>
      <NavBar />
      <Profile />
    </main>
  )
}

// Display name
ProfilePage.displayName = 'Profile'
