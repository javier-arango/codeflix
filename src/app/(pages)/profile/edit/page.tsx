import EditProfile from '@components/EditProfile'
import { getUser } from '@utils/fetcher.utils'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import type { UserDetails } from 'types'

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions)
  const user: UserDetails = await getUser(session?.user?.email)

  return <EditProfile user={user} />
}

// Display name
EditProfilePage.displayName = 'Edit Profile'
