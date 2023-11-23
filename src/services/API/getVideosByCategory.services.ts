import type { CategoryKey } from 'types'
import { baseURL } from '@lib/index'
import type { VideosResponse } from 'types'

export async function GetVideosByCategory(
  categoryId: CategoryKey
): Promise<VideosResponse> {
  try {
    const res = await fetch(`${baseURL}/api/videos?category=${categoryId}`)

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
