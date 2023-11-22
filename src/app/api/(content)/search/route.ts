import prisma from '@lib/prisma'
import type { Video } from '@prisma/client'
import type { VideosResponse } from 'types'

interface RequestInput {
  query: string
}

export async function POST(request: Request) {
  try {
    console.log('Request for search')
    const res: RequestInput = await request.json()
    const query = res.query.split(' ').join(' & ') // This will search for videos with all the words in the query

    /**
     * Search for videos with the title matching the query
     * The search will look for at the video title and description that contain the query
     * The result will be then sorted out by views count
     */
    const videos: Video[] = await prisma.video.findMany({
      where: {
        OR: [{ title: { search: query } }, { description: { search: query } }],
      },
      orderBy: {
        viewsCount: 'desc',
      },
    })

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
