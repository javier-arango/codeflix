import EditProfile from '@components/EditProfile'
import type { UserDetails } from 'types'

async function getUser(email: string | undefined | null) {
  try {
    const res = await fetch('http://localhost:3000/api/user/get_user', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      return {
        error: true,
        message: 'Error getting user info',
      }
    }

    return await res.json()
  } catch (err) {
    return {
      error: true,
      message: 'Error getting user info',
    }
  }
}

export default async function EditProfilePage({
  searchParams,
}: {
  searchParams: { email: string }
}) {
  const { email } = searchParams
  const user: UserDetails = await getUser(email)

  console.log(user)

  return <EditProfile user={user} />
}

// Display name
EditProfilePage.displayName = 'Edit Profile'
