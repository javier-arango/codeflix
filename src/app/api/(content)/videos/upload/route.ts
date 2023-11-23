import type { Video } from '@prisma/client'
import { getVideo, uploadVideo } from '@services/CRUD'

export async function POST(request: Request) {
  try {
    // User request body
    const video: Video = await request.json()

    // Find the video in the database
    const videoExists = await getVideo(video.videoId)

    // Check if the video exists
    if (videoExists) {
      return Response.json({ error: 'Video already exists' }, { status: 400 })
    }

    // Create video
    await uploadVideo(video)

    return Response.json(
      { message: 'Video successfully uploaded' },
      { status: 201 }
    )
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
