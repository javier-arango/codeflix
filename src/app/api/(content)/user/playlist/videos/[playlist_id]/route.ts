import { GetPlaylistVideos } from '@services/CRUD'
import type { VideoListResponse } from 'types'

export async function GET(
  request: Request,
  { params: { playlist_id } }: { params: { playlist_id: string } }
) {
  try {
    // Find the playlist and include the related videos
    const playlistWithVideos = await GetPlaylistVideos(playlist_id)

    // If the playlist doesn't exist, return a 404 error
    if (!playlistWithVideos) {
      return Response.json({ error: 'Playlist not found' }, { status: 404 })
    } else {
      // Otherwise, return the playlist with its related videos
      return Response.json({
        count: playlistWithVideos.videos.length,
        videos: playlistWithVideos.videos,
      } as VideoListResponse)
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
