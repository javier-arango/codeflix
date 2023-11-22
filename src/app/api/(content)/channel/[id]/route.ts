import { getChannel } from '@services/CRUD'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    // Find the video in the database
    const channel = await getChannel(id)

    // If the video doesn't exist, return a 404 error
    if (!channel) {
      return Response.json({ error: 'Channel not found' }, { status: 404 })
    }

    // Otherwise, return the video
    return Response.json(channel)
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
