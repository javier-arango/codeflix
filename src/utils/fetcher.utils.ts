import type { CategoryKey, VideosResponse } from 'types'

export const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => {
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.')
    }
    return res.json()
  })

export async function getVideos(category: CategoryKey) {
  const response = await fetch(
    `http://localhost:3000/api/videos?category=${category}`
  )

  if (!response || !response.ok) {
    return {
      count: 0,
      videos: []
    } as VideosResponse
  }

  return await response.json() as VideosResponse
}

export async function getUser(email: string | undefined | null) {
  try {
    const res = await fetch('http://localhost:3000/api/user/get_user', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      return {
        error: true,
        message: 'Error getting user info',
      }
    }

    return await res.json()
  } catch (err) {
    return {
      error: true,
      message: 'Error getting user info',
    }
  }
}

export async function removeVideoFromPlaylist(videoId : string, playlistId : string) {
  console.log("removing video")
  const response = await fetch('http://localhost:3000/api/user/playlist/edit', {
    method: 'POST',
    body: JSON.stringify({ videoId, playlistId }),
  })

  console.log

  if (!response || !response.ok) {
    throw new Error("Error deleting video")
  }

  return await response.json()
}
