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

    // Check if the video is already in the playlist
    const videoInPlaylist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: { videos: { where: { videoId: videoId } } },
    })

    // Check if the video is not in the playlist
    if (videoInPlaylist && videoInPlaylist.videos.length === 0) {
      return Response.json(
        { error: 'Video is not in the playlist' },
        { status: 400 }
      )
    }

    // Remove the video from the playlist
    await prisma.playlist.update({
      where: { id: playlistId },
      data: { videos: { disconnect: { videoId: videoId } } },
    })

    return Response.json(
      { message: 'Video was removed successfully' },
      { status: 200 }
    )
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
