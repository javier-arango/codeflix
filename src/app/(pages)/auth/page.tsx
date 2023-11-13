import Auth from '@components/Auth'
import NavBar from '@components/NavBar'
// import { redirect } from 'next/navigation'
// import { authOptions } from 'app/api/(auth)/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
// import Link from 'next/link'

export default async function AuthPage() {
  // const session = await getServerSession(authOptions)
  // // Redirect to home if user is authenticated
  // if (session) {
  //   redirect('/')
  // }

  return (
    <main>
      <NavBar />
      <Auth />
    </main>
  )
}

// Display name
AuthPage.displayName = 'Authentication'
