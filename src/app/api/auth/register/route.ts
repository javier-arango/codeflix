import type { User } from '@prisma/client'
import { CreateUser, GetUser } from '@services/CRUD'

export async function POST(request: Request) {
  try {
    const user: User = await request.json()

    // Find the user in the database
    const exists = await GetUser(user.email)

    // Check if the user exists
    if (exists) {
      return Response.json({ error: 'User already exists' }, { status: 400 })
    } else {
      // Create the user if they don't exist
      await CreateUser(user)

      return Response.json(
        { message: 'User successfully created' },
        { status: 201 }
      )
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
