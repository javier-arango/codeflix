import { baseURL } from '@lib/baseUrl'
import type { VideoExistResponse } from 'types'

export async function checkIfVideoIsSavedToPlaylist(
  playlistId: string,
  videoId: string
) {
  try {
    const res = await fetch(
      `${baseURL}/api/user/playlist/videos/is_video_in_playlist?videoId=${videoId}&playlistId=${playlistId}`
    )

    if (!res.ok) {
      return null
    }

    return (await res.json()) as VideoExistResponse
  } catch (err) {
    console.error(err)
    return null
  }
}
