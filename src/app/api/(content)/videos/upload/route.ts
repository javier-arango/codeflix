import prisma from '@lib/prisma'
import type { Video } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const video: Video = await request.json()

    // Find the user in the database
    const exists = await prisma.video.findUnique({
      where: {
        videoId: video.videoId,
      },
    })

    // Check if the user exists
    if (exists) {
      return Response.json({ error: 'Video already exists' }, { status: 400 })
    } else {
      // Create the user if they don't exist
      await prisma.video.create({
        data: video,
      })

      return Response.json(
        { message: 'Video successfully created' },
        { status: 201 }
      )
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
