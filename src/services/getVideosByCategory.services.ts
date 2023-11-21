import type { CategoryKey } from '@constants/index'
import type { VideoListResponse } from 'types'

export async function getVideosByCategory(
  categoryId: CategoryKey
): Promise<VideoListResponse> {
  try {
    const res = await fetch(
      `http://localhost:3000/api/videos?category=${categoryId}`
    )

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
