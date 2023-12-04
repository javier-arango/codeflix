import {
  getPlaylist,
  getPlaylistVideo,
  getVideo,
  removeVideoFromPlaylist,
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
      video = await getVideo(videoId)

      // Check if the video exists
      if (!video)
        return Response.json({ error: 'Video do not exists' }, { status: 400 })
    }

    // Find if the playlist exists
    const playlist = await getPlaylist(playlistId)

    // Check if the playlist exists
    if (!playlist) {
      return Response.json({ error: 'Playlist do not exists' }, { status: 400 })
    }

    // Check if the video is already in the playlist
    const videoInPlaylist = await getPlaylistVideo(playlistId, videoId)

    // Check if the video is not in the playlist
    if (videoInPlaylist && videoInPlaylist.videos.length === 0) {
      return Response.json(
        { error: 'Video is not in the playlist' },
        { status: 400 }
      )
    }

    // Remove the video from the playlist
    await removeVideoFromPlaylist(playlistId, videoId)

    return Response.json(
      { message: 'Video was successfully removed' },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
