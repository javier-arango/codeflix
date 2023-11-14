import { redirect } from 'next/navigation'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { RegisterForm } from '@components/index'

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)
  // Redirect to home if user is authenticated
  if (session) {
    redirect('/')
  }

  return (
    <div>
      <h1>Create your Account</h1>
      <RegisterForm />

      <p>
        Already have an account? <Link href="/login">Sign in</Link> instead.
      </p>
    </div>
  )
}

// Display name
RegisterPage.displayName = 'RegisterPage'
