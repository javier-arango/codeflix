import type { Video } from '@prisma/client'

export async function getVideoDetails(videoId: string): Promise<Video | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/videos/${videoId}`)

    if (!res.ok) {
      return null
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}
