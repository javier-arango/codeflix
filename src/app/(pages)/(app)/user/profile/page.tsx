import { UserProfile } from '@components/foundation'
import { getUserDetails } from '@services/API'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { AiFillWarning } from 'react-icons/ai'
import type { UserDetails } from 'types'

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // User session
  const session = await getServerSession(authOptions)

  // Fetch user data
  let user: UserDetails | null = null
  if (session && session.user && session.user.email) {
    user = await getUserDetails(session.user.email)
  }

  return (
    <div className="p-8">
      {user ? (
        <>
        <UserProfile user={user} />
        {children}
        </>
      ) : (
        // User is not login yet send the user to login page
        <div className="flex flex-col items-center justify-center w-screen h-screen">
          <AiFillWarning className="text-6xl text-default-500" />
          <h1 className="text-2xl font-bold">User not sign in</h1>
          <p className="text-default-500 text-sm">
            Please sign in to view your profile
          </p>
        </div>
      )}
    </div>
  )
}

// Display name
ProfileLayout.displayName = 'ProfileLayout'
