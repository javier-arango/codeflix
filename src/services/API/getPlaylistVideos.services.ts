import { baseURL } from '@lib/index'
import type { VideoListResponse } from 'types'

export async function getPlaylistVideos(
  playlistId: string
): Promise<VideoListResponse> {
  try {
    const res = await fetch(
      `${baseURL}/api/user/playlist/videos/${playlistId}`,
      { cache: 'no-cache' }
    )

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
