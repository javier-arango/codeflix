import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashPassword = await hash('test', 12)

  console.log(`Start seeding ...`)

  // Create or update the test user
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {
      password: hashPassword,
      firstName: 'Alice',
      lastName: 'Johnson',
    },
    create: {
      email: 'test@test.com',
      password: hashPassword,
      firstName: 'Alice',
      lastName: 'Johnson',
    },
  })

  console.log({ user })
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
