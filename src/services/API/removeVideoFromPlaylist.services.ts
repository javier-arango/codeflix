import { baseURL } from '@lib/index'

export async function removeVideoFromPlaylist(
  playlistId: string,
  videoId: string
) {
  try {
    const res = await fetch(`${baseURL}/api/user/playlist/edit`, {
      method: 'POST',
      body: JSON.stringify({ videoId, playlistId }),
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
