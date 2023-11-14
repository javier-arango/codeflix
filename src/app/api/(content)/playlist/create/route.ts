import prisma from '@lib/prisma'

interface UserRequest {
  userEmail: string
  videoId?: string
  playlist: {
    name: string
    description?: string
  }
}

export async function POST(request: Request) {
  try {
    const data: UserRequest = await request.json()
    const { userEmail, videoId, playlist } = data

    // First find if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    })

    // Check if the user exists
    if (!user) {
      return Response.json({ error: 'User do not exists' }, { status: 400 })
    }

    // Find if the video exists
    let video = null
    if (videoId) {
      video = await prisma.video.findUnique({ where: { videoId: videoId } })

      // Check if the video exists
      if (!video)
        return Response.json({ error: 'Video do not exists' }, { status: 400 })
    }

    /**
     * The user is able to create a playlist with or without a video
     * If the user creates a playlist with a video, the video will be added to the playlist
     * If the user creates a playlist without a video, the playlist will be created without a video
     *
     * Example input with video:
     * {
     *  "userEmail": "test@test.com"
     *  "videoId": "RBSGKlAvoiM",
     *  "playlist": {
     *      "name": "Algorithm and Data Structures",
     *      "description": "A playlist about algorithms and data structures"
     * }
     * 
     * Example input without video:
     * {
     * "userEmail": "test@test.com"
     * "playlist": {
     *     "name": "Algorithm and Data Structures",
     *    "description": "A playlist about algorithms and data structures"
     * }
     */
    await prisma.playlist.create({
      data: {
        name: playlist.name,
        description: playlist.description || '',
        user: { connect: { email: userEmail } },
        ...(videoId && { videos: { connect: [{ videoId }] } }),
      },
    })

    return Response.json(
      { message: 'Playlist successfully created' },
      { status: 201 }
    )
  } catch (err) {
    console.log('Error', err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
