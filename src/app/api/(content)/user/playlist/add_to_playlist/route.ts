import {
  GetPlaylist,
  GetPlaylistVideo,
  GetVideo,
  UpdatePlaylist,
} from '@services/CRUD'

interface UserRequest {
  videoId: string
  playlistId: string
}

export async function POST(request: Request) {
  try {
    const data: UserRequest = await request.json()
    const { videoId, playlistId } = data

    // Find if the video exists
    let video = null
    if (videoId) {
      video = await GetVideo(videoId)

      // Check if the video exists
      if (!video)
        return Response.json({ error: 'Video do not exists' }, { status: 400 })
    }

    // Find the playlist in the database
    const playlistExists = await GetPlaylist(playlistId)

    // Check if the playlist exists
    if (!playlistExists) {
      return Response.json({ error: 'Playlist do not exists' }, { status: 400 })
    }

    // Find if the video already exist in the playlist
    const videoExists = await GetPlaylistVideo(playlistId, videoId)

    // Check if the video already exist in the playlist
    if (videoExists && videoExists.videos.length > 0) {
      return Response.json(
        { error: 'Video already exists in the playlist' },
        { status: 400 }
      )
    }

    // Find if the playlist exists
    await UpdatePlaylist(playlistId, videoId)

    return Response.json(
      { message: 'Video was added successfully' },
      { status: 200 }
    )
  } catch (err) {
    console.log('Error', err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
