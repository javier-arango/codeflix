import {
  VIDEO_CATEGORIES,
  type CategoryKey,
} from '@constants/videoCategories.constants'
import prisma from '@lib/prisma'
import type { Video } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category') as CategoryKey | null

    // Check if a category param was passed
    // Example: /api/videos?category=algorithms
    if (!categoryId) {
      return Response.json(
        { error: 'Bad Request: Category is required' },
        { status: 400 }
      )
    }

    // Check if the category param is a valid category
    if (!Object.keys(VIDEO_CATEGORIES).includes(categoryId)) {
      return Response.json(
        { error: 'Bad Request: Invalid category id' },
        { status: 400 }
      )
    }

    // Find the videos with the category id passed
    // Filter by viewsCount in descending order
    const videos: Video[] = await prisma.video.findMany({
      where: {
        categoryId: categoryId,
      },
      orderBy: {
        viewsCount: 'desc',
      },
    })

    // If the category id is not inside the database, return an empty array
    if (!videos) {
      return Response.json({ error: 'No videos found' }, { status: 404 })
    } else {
      // If the category id is inside the database, return the videos
      return Response.json({
        count: videos.length,
        videos,
      })
    }
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
