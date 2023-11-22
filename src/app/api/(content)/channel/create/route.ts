import type { Channel } from '@prisma/client'
import { CreateChannel, GetChannel } from '@services/CRUD'

export async function POST(request: Request) {
  try {
    // User request body
    const channel: Channel = await request.json()

    // Find the channel in the database
    const channelExists = await GetChannel(channel.channelId)

    // Check if the channel exists
    if (channelExists) {
      return Response.json({ error: 'Channel already exists' }, { status: 400 })
    }

    // Create channel
    await CreateChannel(channel)

    return Response.json(
      { message: 'Channel successfully created' },
      { status: 201 }
    )
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
