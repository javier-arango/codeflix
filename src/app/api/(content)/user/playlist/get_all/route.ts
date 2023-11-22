import prisma from '@lib/prisma'
import type { PlaylistListResponse } from 'types'

interface UserRequest {
  userEmail: string
}

export async function POST(request: Request) {
  try {
    const data: UserRequest = await request.json()
    const { userEmail } = data

    // Find if the user exists
    const user = await prisma.user.findUnique({ where: { email: userEmail } })

    // Check if the video exists
    if (!user) {
      return Response.json({ error: 'User do not exists' }, { status: 400 })
    }

    // Find all the user's playlists
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
    })

    return Response.json({
      count: playlists.length,
      playlists,
    } as PlaylistListResponse)
  } catch (err) {
    console.log('Error', err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
