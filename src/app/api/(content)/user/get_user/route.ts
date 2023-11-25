import type { User } from '@prisma/client'
import { GetUser } from '@services/CRUD'
import type { UserDetails } from 'types'

interface RequestInput {
  email: string
}

export async function POST(request: Request) {
  try {
    // Get user email from request
    const res: RequestInput = await request.json()
    const { email } = res

    // Find the user in the database
    const user: User | null = await GetUser(email)

    // If the user doesn't exist, return a 404 error
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    } else {
      // Otherwise, return the user
      return Response.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      } as UserDetails)
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
