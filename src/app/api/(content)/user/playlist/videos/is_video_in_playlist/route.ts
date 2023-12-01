import { GetPlaylist, GetPlaylistVideo, GetVideo } from '@services/CRUD'
import type { VideoExistResponse } from 'types'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const videoId = url.searchParams.get('videoId')
  const playlistId = url.searchParams.get('playlistId')

  if (!videoId || !playlistId) {
    return Response.json(
      { error: 'Missing videoId or playlistId' },
      { status: 400 }
    )
  }

  try {
    // Check if video exists
    const video = await GetVideo(videoId)
    if (!video) {
      return Response.json(
        { error: 'Video does not exist' },
        {
          status: 400,
        }
      )
    }

    // Check if playlist exists
    const playlistExists = await GetPlaylist(playlistId)
    if (!playlistExists) {
      return Response.json(
        { error: 'Playlist does not exist' },
        { status: 400 }
      )
    }

    // Check if video is in playlist
    const videoInPlaylist = await GetPlaylistVideo(playlistId, videoId)
    const videoExists = videoInPlaylist && videoInPlaylist.videos.length > 0

    return Response.json({ videoExists } as VideoExistResponse, { status: 200 })
  } catch (err) {
    console.error('Error', err)
    return Response.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
      }
    )
  }
}
