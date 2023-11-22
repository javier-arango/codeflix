import { baseURL } from '@lib/index'
import type { VideoListResponse } from 'types'

export async function getChannelVideos(
  channelId: string
): Promise<VideoListResponse> {
  try {
    const res = await fetch(`${baseURL}/api/channel/videos/${channelId}`)

    if (!res.ok) {
      return {
        count: 0,
        videos: [],
      }
    }

    return (await res.json()) as VideoListResponse
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      videos: [],
    }
  }
}
