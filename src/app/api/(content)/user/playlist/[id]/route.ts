import type { Playlist } from '@prisma/client'
import { GetPlaylist } from '@services/CRUD'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    // Find the playlist in the database
    const playlist: Playlist | null = await GetPlaylist(id)

    // If the playlist doesn't exist, return a 404 error
    if (!playlist) {
      return Response.json({ error: 'Playlist not found' }, { status: 404 })
    } else {
      // Otherwise, return the playlist
      return Response.json(playlist)
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
