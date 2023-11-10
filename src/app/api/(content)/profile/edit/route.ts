import prisma from '@lib/prisma'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

interface UserProfile {
  firstName?: string
  lastName?: string
  avatar?: string
  bio?: string
}

export async function PATCH(request: Request) {
  try {
    // Get the current user's session
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.email) {
      return Response.json({ error: 'Unauthorized' }, { status: 400 })
    }

    // Get the values to update
    const newValues: UserProfile = await request.json()

    // Find the user in the database
    const updatedUser = await prisma.user.update({
      where: { email: session.user?.email },
      data: {
        firstName: newValues.firstName,
        lastName: newValues.lastName,
        avatar: newValues.avatar,
        bio: newValues.bio,
      },
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
