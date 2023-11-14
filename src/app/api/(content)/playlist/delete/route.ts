import prisma from '@lib/prisma'

interface UserRequest {
  id: string
}

export async function POST(request: Request) {
  try {
    const data: UserRequest = await request.json()
    const { id: id } = data

    // Find if the playlist exists
    const playlist = await prisma.playlist.findUnique({
      where: { id: id },
    })

    // Check if the playlist exists
    if (!playlist) {
      return Response.json({ error: 'Playlist do not exists' }, { status: 400 })
    }

    // Delete the playlist
    await prisma.playlist.delete({ where: { id: id } })

    return Response.json(
      { message: 'Playlist was successfully deleted' },
      { status: 200 }
    )
  } catch (err) {
    console.log('Error', err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
