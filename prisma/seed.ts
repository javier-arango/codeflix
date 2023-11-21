import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashPassword = await hash('test1234', 12)

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

  const playlist1 = await prisma.playlist.upsert({
    where: { id: '1' },
    update: {
      id: '1',
      name: 'Watch List',
      description: 'A playlist for videos to watch later',
      user: {
        connect: {
          email: 'test@test.com',
        },
      },
      videos: {
        connect: [
          {
            videoId: 'GwIo3gDZCVQ',
          },
          {
            videoId: 'i_LwzRVP7bg',
          },
          {
            videoId: 'h0e2HAPTGF4',
          },
        ],
      },
    },
    create: {
      id: '1',
      name: 'Watch List',
      description: 'A playlist for videos to watch later',
      user: {
        connect: {
          email: 'test@test.com',
        },
      },
      videos: {
        connect: [
          {
            videoId: 'GwIo3gDZCVQ',
          },
          {
            videoId: 'i_LwzRVP7bg',
          },
          {
            videoId: 'h0e2HAPTGF4',
          },
        ],
      },
    },
  })

  const playlist2 = await prisma.playlist.upsert({
    where: { id: '2' },
    update: {
      id: '2',
      name: 'Favorite',
      description: 'A playlist for favorite videos',
      user: {
        connect: {
          email: 'test@test.com',
        },
      },
      videos: {
        connect: [
          {
            videoId: 'RBSGKlAvoiM',
          },
          {
            videoId: 'zg9ih6SVACc',
          },
          {
            videoId: 'BBpAmxU_NQo',
          },
        ],
      },
    },
    create: {
      id: '2',
      name: 'Favorite',
      description: 'A playlist for favorite videos',
      user: {
        connect: {
          email: 'test@test.com',
        },
      },
      videos: {
        connect: [
          {
            videoId: 'RBSGKlAvoiM',
          },
          {
            videoId: 'zg9ih6SVACc',
          },
          {
            videoId: 'BBpAmxU_NQo',
          },
        ],
      },
    },
  })

  console.log({ user, playlist1, playlist2 })
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
