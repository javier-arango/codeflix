import type { Channel } from '@prisma/client'

export async function getChannelDetails(
  channelId: string
): Promise<Channel | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/channel/${channelId}`)

    if (!res.ok) {
      return null
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}
