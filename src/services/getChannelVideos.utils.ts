import { baseURL } from '@lib/index'
import type { SearchResponse } from 'types'

export async function getChannelVideos(
  channelId: string
): Promise<SearchResponse> {
  try {
    const res = await fetch(`${baseURL}/api/channel/videos/${channelId}`)

    if (!res.ok) {
      return {
        count: 0,
        result: [],
      }
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      result: [],
    }
  }
}
