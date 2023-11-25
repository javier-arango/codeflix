import { baseURL } from '@lib/index'
import type { User } from '@prisma/client'

export async function getUserDetails(videoId: string): Promise<User | null> {
  try {
    const res = await fetch(`${baseURL}/api/videos/${videoId}`)

    if (!res.ok) {
      return null
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}
