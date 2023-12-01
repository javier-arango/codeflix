import { baseURL } from '@lib/index'
import type { CreatePlaylistRequest } from 'types'

export async function createPlaylist(playlistRequest: CreatePlaylistRequest) {
  try {
    const res = await fetch(`${baseURL}/api/user/playlist/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...playlistRequest }),
    })

    if (!res.ok) {
      throw new Error('Something went wrong')
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return { error: err }
  }
}
