import { baseURL } from '@lib/index'
import type { UpdatedProfile } from 'types'

interface UserResponse {
  email: string
  newValues: UpdatedProfile
}

export async function updateUserProfile(
  email: string,
  updatedValues: UpdatedProfile
) {
  try {
    const res = await fetch(`${baseURL}/api/user/profile/edit`, {
      method: 'PATCH',
      body: JSON.stringify({
        email,
        newValues: updatedValues,
      } as UserResponse),
    })

    if (!res.ok) {
      throw new Error('Something went wrong')
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return { error: err }
  }
}
