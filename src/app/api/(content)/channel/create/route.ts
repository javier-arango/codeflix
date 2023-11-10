import prisma from '@lib/prisma'
import type { Channel } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const channel: Channel = await request.json()

    // Find the user in the database
    const exists = await prisma.channel.findUnique({
      where: {
        channelId: channel.channelId,
      },
    })

    // Check if the user exists
    if (exists) {
      return Response.json({ error: 'Channel already exists' }, { status: 400 })
    } else {
      // Create the user if they don't exist
      await prisma.channel.create({
        data: channel,
      })

      return Response.json(
        { message: 'Channel successfully created' },
        { status: 201 }
      )
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
