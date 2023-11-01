import { prisma } from '@lib/index'

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}