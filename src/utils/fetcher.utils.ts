import { baseURL } from '@lib/baseUrl'
import type { CategoryKey, VideosResponse } from 'types'

export async function getVideos(category: CategoryKey) {
  const response = await fetch(
    `${baseURL}/api/videos?category=${category}`,
    { cache: 'no-cache' }
  )

  if (!response || !response.ok) {
    return {
      count: 0,
      videos: [],
    } as VideosResponse
  }

  return (await response.json()) as VideosResponse
}

export async function getUser(email: string | undefined | null) {
  try {
    const res = await fetch(`${baseURL}/api/user/get_user`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      cache: 'no-cache',
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

export async function removeVideoFromPlaylist(
  videoId: string,
  playlistId: string
) {
  const response = await fetch(`${baseURL}/api/user/playlist/edit`, {
    method: 'POST',
    body: JSON.stringify({ videoId, playlistId }),
    cache: 'no-cache'
  })

  if (!response || !response.ok) {
    throw new Error('Error deleting video')
  }

  return await response.json()
}

export async function getPlaylists(userEmail: string | undefined | null) {
  try {
    const res = await fetch(`${baseURL}/api/user/playlist/get_all`, {
      method: 'POST',
      body: JSON.stringify({ userEmail }),
      cache: 'no-cache',
    })

    if (!res.ok) {
      return {
        count: 0,
        playlists: [],
      }
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      playlists: [],
    }
  }
}

export async function getVideosOfPlaylists(playlistId: string) {
  const response = await fetch(
    `${baseURL}/api/user/playlist/videos/${playlistId}`,
    { cache: 'no-cache' }
  )

  if (!response || !response.ok) {
    return null
  }

  return await response.json()
}

export async function addVideoToPlaylist(videoId: string, playlistId: string) {
  const response = await fetch(`${baseURL}/api/user/playlist/add_to_playlist`, {
    method: 'POST',
    body: JSON.stringify({ videoId, playlistId }),
  })

  if (!response || !response.ok) {
    throw new Error('Error deleting video')
  }

  return await response.json()
}

export async function searchVideos(query?: string): Promise<VideosResponse> {
  try {
    const res = await fetch(`${baseURL}:3000/api/search`, {
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
