import { redirect } from 'next/navigation'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { LoginForm } from '@components/elements'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  // Redirect to home if user is authenticated
  if (session) {
    redirect('/')
  }

  return (
    <>
      <div>
        <h1>Sign In</h1>
        <LoginForm />

        <p>
          Don&apos;t have an account? <Link href="/register">Sign Up</Link> for
          free.
        </p>
      </div>
    </>
  )
}

// Display name
LoginPage.displayName = 'LoginPage'
