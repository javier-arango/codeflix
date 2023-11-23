import { baseURL } from '@lib/index'
import type { VideosResponse } from 'types'

export async function SearchVideos(query?: string): Promise<VideosResponse> {
  try {
    const res = await fetch(`${baseURL}/api/search`, {
      method: 'POST',
      body: JSON.stringify({ query }),
    })

    if (!res.ok) {
      return {
        count: 0,
        videos: [],
      }
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      videos: [],
    }
  }
}
