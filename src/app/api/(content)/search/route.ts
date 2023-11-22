import type { Video } from '@prisma/client'
import { SearchVideosByQuery } from '@services/CRUD'
import type { SearchResponse } from 'types'

interface RequestInput {
  query: string
}

export async function POST(request: Request) {
  try {
    const res: RequestInput = await request.json()
    const query = res.query.split(' ').join(' & ') // This will search for videos with all the words in the query

    // Search for videos
    const videos: Video[] = await SearchVideosByQuery(query)

    // No videos found
    if (videos.length === 0) {
      return Response.json({ error: 'No videos found' }, { status: 404 })
    }

    return Response.json({
      count: videos.length,
      result: videos,
    } as SearchResponse)
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
