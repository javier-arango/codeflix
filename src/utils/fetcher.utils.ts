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
      videos: [],
    } as VideosResponse
  }

  return (await response.json()) as VideosResponse
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

export async function removeVideoFromPlaylist(
  videoId: string,
  playlistId: string
) {
  const response = await fetch('http://localhost:3000/api/user/playlist/edit', {
    method: 'POST',
    body: JSON.stringify({ videoId, playlistId }),
  })

  if (!response || !response.ok) {
    throw new Error('Error deleting video')
  }

  return await response.json()
}

export async function getPlaylists(userEmail: string | undefined | null) {
  try {
    const res = await fetch('http://localhost:3000/api/user/playlist/get_all', {
      method: 'POST',
      body: JSON.stringify({ userEmail }),
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
    `http://localhost:3000/api/user/playlist/videos/${playlistId}`
  )

  if (!response || !response.ok) {
    return null
  }

  return await response.json()
}

export async function addVideoToPlaylist(videoId: string, playlistId: string) {
  const response = await fetch(
    'http://localhost:3000/api/user/playlist/add_to_playlist',
    {
      method: 'POST',
      body: JSON.stringify({ videoId, playlistId }),
    }
  )

  if (!response || !response.ok) {
    throw new Error('Error deleting video')
  }

  return await response.json()
}
