import { GetChannelVideos } from '@services/CRUD'
import type { VideoListResponse } from 'types'

export async function GET(
  request: Request,
  { params: { channel_id } }: { params: { channel_id: string } }
) {
  try {
    // Find the channel and include the related videos
    const channelWithVideos = await GetChannelVideos(channel_id)

    // If the channel doesn't exist, return a 404 error
    if (!channelWithVideos) {
      return Response.json({ error: 'Channel not found' }, { status: 404 })
    } else {
      // Otherwise, return the channel with its related videos
      return Response.json({
        count: channelWithVideos.videos.length,
        videos: channelWithVideos.videos,
      } as VideoListResponse)
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
