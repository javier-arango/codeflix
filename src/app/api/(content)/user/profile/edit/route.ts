import prisma from '@lib/prisma'

interface UpdatedProfile {
  firstName?: string
  lastName?: string
  avatar?: string
  bio?: string
}

interface UserResponse {
  email: string
  newValues: UpdatedProfile
}

export async function PATCH(request: Request) {
  try {
    // Get the values to update
    const { email, newValues }: UserResponse = await request.json()

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    // Check if the user exists
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: newValues,
    })

    return Response.json(
      {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
      },
      { status: 200 }
    )
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
