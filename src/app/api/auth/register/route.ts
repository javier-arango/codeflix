import prisma from '@lib/prisma'
import type { User } from '@prisma/client'
import { hash } from 'bcrypt'

export async function POST(request: Request) {
  try {
    const user: User = await request.json()

    // Find the user in the database
    const exists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    // Check if the user exists
    if (exists) {
      return Response.json({ error: 'User already exists' }, { status: 400 })
    } else {
      // Create the user if they don't exist
      await prisma.user.create({
        data: {
          ...user,
          password: await hash(user.password, 12),
        },
      })

      return Response.json(
        { message: 'User successfully created' },
        { status: 201 }
      )
    }
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
