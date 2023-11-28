import { baseURL } from '@lib/index'
import type { PlaylistDetails } from 'types'

export async function getPlaylistDetails(
  playlistId: string
): Promise<PlaylistDetails | null> {
  try {
    const res = await fetch(`${baseURL}/api/user/playlist/${playlistId}`)

    if (!res.ok) {
      return null
    }

    return (await res.json()) as PlaylistDetails
  } catch (err) {
    console.error(err)
    return null
  }
}
