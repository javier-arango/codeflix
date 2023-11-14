import prisma from '@lib/prisma'

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
      video = await prisma.video.findUnique({ where: { videoId: videoId } })

      // Check if the video exists
      if (!video)
        return Response.json({ error: 'Video do not exists' }, { status: 400 })
    }

    // Find if the playlist exists
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
    })

    // Check if the playlist exists
    if (!playlist) {
      return Response.json({ error: 'Playlist do not exists' }, { status: 400 })
    }

    // Add the video to the playlist
    await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        videos: {
          connect: {
            videoId: videoId,
          },
        },
      },
    })

    return Response.json(
      { message: 'Video was added successfully' },
      { status: 200 }
    )
  } catch (err) {
    console.log('Error', err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
