import { getPlaylistVideos } from '@services/CRUD'
import type { VideosResponse } from 'types'

export async function GET(
  request: Request,
  { params: { playlist_id } }: { params: { playlist_id: string } }
) {
  try {
    // Find the playlist and include the related videos
    const playlistWithVideos = await getPlaylistVideos(playlist_id)

    // If the playlist doesn't exist, return a 404 error
    if (!playlistWithVideos) {
      return Response.json({ error: 'Playlist not found' }, { status: 404 })
    } else {
      // Otherwise, return the playlist with its related videos
      return Response.json({
        count: playlistWithVideos.videos.length,
        videos: playlistWithVideos.videos,
      } as VideosResponse)
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
