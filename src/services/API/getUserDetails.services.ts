import { baseURL } from '@lib/index'
import type { UserDetails } from 'types'

export async function getUserDetails(
  email: string
): Promise<UserDetails | null> {
  try {
    const res = await fetch(`${baseURL}/api/user/get_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      cache: 'no-cache',
    })

    if (!res.ok) {
      return null
    }

    return (await res.json()) as UserDetails
  } catch (err) {
    console.error(err)
    return null
  }
}
