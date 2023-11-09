import { createVideo } from '@services/CRUD'
import { handlePrismaError } from '@utils/index'
import { Prisma, type Video } from '@prisma/client'

export async function POST(request: Request) {
  // Get the body of the request
  const res: Video = await request.json()

  try {
    // Create video in the database
    const { statusCode, message } = await createVideo(res)
    return new Response(JSON.stringify({ message, success: true }), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const { statusCode, message } = handlePrismaError(err)

      // Return the error message and the appropriate status code
      return new Response(JSON.stringify({ message, success: false }), {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }
}
