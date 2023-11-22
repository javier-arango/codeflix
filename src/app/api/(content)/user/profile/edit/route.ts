import { GetUser, UpdateUser } from '@services/CRUD'
import type { UpdatedProfile } from 'types'

interface UserResponse {
  email: string
  newValues: UpdatedProfile
}

export async function PATCH(request: Request) {
  try {
    // Get the values to update
    const { email, newValues }: UserResponse = await request.json()

    // Find the user in the database
    const userExists = await GetUser(email)

    // Check if the user exists
    if (!userExists) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    // Update the user
    await UpdateUser(email, newValues)

    return Response.json(
      { message: 'User successfully updated' },
      { status: 200 }
    )
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
