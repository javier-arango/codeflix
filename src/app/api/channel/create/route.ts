import { createChannel } from '@services/CRUD'
import { handlePrismaError } from '@utils/index'
import { Prisma, type Channel } from '@prisma/client'

export async function POST(request: Request) {
  // Get the body of the request
  const res: Channel = await request.json()

  try {
    // Create channel in the database
    const { statusCode, message } = await createChannel(res)
    return new Response(JSON.stringify({ message, success: true }), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    let statusCode = 500
    let message = 'Internal server error'

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // If it's a known Prisma error, use the handler to get the status code and message
      ;({ statusCode, message } = handlePrismaError(err))
    } else if (err instanceof Error) {
      // Optionally, handle generic errors
      message = err.message
    }
    // Return the error message and the appropriate status code
    return new Response(JSON.stringify({ message, success: false }), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
