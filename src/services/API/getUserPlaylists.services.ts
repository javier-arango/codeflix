import { baseURL } from '@lib/index'
import type { PlaylistListResponse } from 'types'

export async function getUserPlaylists(
  userEmail: string
): Promise<PlaylistListResponse> {
  try {
    const res = await fetch(`${baseURL}/api/user/playlist/get_all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail }),
      cache: 'no-cache',
    })

    if (!res.ok) {
      return {
        count: 0,
        playlists: [],
      }
    }

    return (await res.json()) as PlaylistListResponse
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      playlists: [],
    }
  }
}
