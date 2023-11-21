import prisma from '@lib/prisma'
import type { Channel, Video } from '@prisma/client'
import type { SearchResponse } from 'types'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    // Find the channel and include the related videos
    const channelWithVideos: (Channel & { videos: Video[] }) | null =
      await prisma.channel.findUnique({
        where: {
          channelId: id,
        },
        include: {
          videos: true,
        },
      })

    // If the channel doesn't exist, return a 404 error
    if (!channelWithVideos) {
      return Response.json({ error: 'Channel not found' }, { status: 404 })
    } else {
      // Otherwise, return the channel with its related videos
      return Response.json({
        count: channelWithVideos.videos.length,
        result: channelWithVideos.videos,
      } as SearchResponse)
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
