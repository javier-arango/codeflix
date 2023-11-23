import { createPlaylist, getUser, getVideo } from '@services/CRUD'
import type { CreatePlaylist } from 'types'

export async function POST(request: Request) {
  try {
    const data: CreatePlaylist = await request.json()
    const { userEmail, videoId } = data

    // First find if the user exists
    const user = await getUser(userEmail)

    // Check if the user exists
    if (!user) {
      return Response.json({ error: 'User do not exists' }, { status: 400 })
    }

    // Find if the video exists
    let video = null
    if (videoId) {
      video = await getVideo(videoId)

      // Check if the video exists
      if (!video)
        return Response.json({ error: 'Video do not exists' }, { status: 400 })
    }

    // Create the playlist
    await createPlaylist(data)

    return Response.json(
      { message: 'Playlist successfully created' },
      { status: 201 }
    )
  } catch (err) {
    console.log('Error', err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
