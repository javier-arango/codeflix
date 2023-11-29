import Auth from '@components/Auth'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/route'

export default async function AuthPage() {
  const session = await getServerSession(authOptions)
  
  // Redirect to home if user is authenticated
  if (session) {
    redirect('/')
  }

  return (
    <main>
      <Auth />
    </main>
  )
}

// Display name
AuthPage.displayName = 'Authentication'
