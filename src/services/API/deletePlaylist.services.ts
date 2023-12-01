import { baseURL } from '@lib/index'

export async function deletePlaylist(playlistId: string) {
  try {
    const res = await fetch(
      `${baseURL}/api/user/playlist/delete?id=${playlistId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!res.ok) {
      throw new Error('Something went wrong')
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return { error: err }
  }
}
