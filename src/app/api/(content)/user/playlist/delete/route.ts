import prisma from '@lib/prisma'
import { GetPlaylist } from '@services/CRUD'

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const playlistId = searchParams.get('id')

    // Check if a playlist id param was passed
    // Example: /api/playlist/delete?id=1
    if (!playlistId) {
      return Response.json(
        { error: 'Bad Request: id is required' },
        { status: 400 }
      )
    }

    // Find if the playlist exists
    const playlist = await GetPlaylist(playlistId)

    // Check if the playlist exists
    if (!playlist) {
      return Response.json({ error: 'Playlist do not exists' }, { status: 400 })
    }

    // Delete the playlist
    await prisma.playlist.delete({ where: { id: playlistId } })

    return Response.json(
      { message: 'Playlist was successfully deleted' },
      { status: 200 }
    )
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
