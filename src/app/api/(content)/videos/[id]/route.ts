import prisma from '@lib/prisma'
import type { Video } from '@prisma/client'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    // Find the video in the database
    const video: Video | null = await prisma.video.findUnique({
      where: {
        videoId: id,
      },
    })

    // If the video doesn't exist, return a 404 error
    if (!video) {
      return Response.json({ error: 'Video not found' }, { status: 404 })
    } else {
      // Otherwise, return the video
      return Response.json(video)
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
