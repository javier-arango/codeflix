import { baseURL } from '@lib/index'
import type { VideosResponse } from 'types'

export async function GetChannelVideos(channelId: string): Promise<VideosResponse> {
  try {
    const res = await fetch(`${baseURL}/api/channel/videos/${channelId}`)

    if (!res.ok) {
      return {
        count: 0,
        videos: [],
      }
    }

    return (await res.json()) as VideosResponse
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      videos: [],
    }
  }
}
