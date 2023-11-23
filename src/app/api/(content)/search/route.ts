import type { Video } from '@prisma/client'
import { searchVideosByQuery } from '@services/CRUD'
import type { VideosResponse } from 'types'

interface RequestInput {
  query: string
}

export async function POST(request: Request) {
  try {
    console.log('Request for search')
    const res: RequestInput = await request.json()
    const query = res.query.split(' ').join(' & ') // This will search for videos with all the words in the query

    // Search for videos
    const videos: Video[] = await searchVideosByQuery(query)

    // No videos found
    if (videos.length === 0) {
      return Response.json({ error: 'No videos found' }, { status: 404 })
    }

    return Response.json({
      count: videos.length,
      videos: videos,
    } as VideosResponse)
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
