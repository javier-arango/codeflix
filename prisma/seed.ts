// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function main() {
//   console.log(`Start seeding ...`)
//   //   const user = await prisma.user.upsert({
//   //     where: { email: 'alice@example.com' },
//   //     update: {},
//   //     create: {
//   //       userId: 'uuid-1',
//   //       userName: 'alice',
//   //       email: 'alice@example.com',
//   //       password: 'alicepassword',
//   //       firstName: 'Alice',
//   //       lastName: 'Johnson',
//   //       bio: 'Learning to code!',
//   //       dateCreated: new Date(),
//   //     },
//   //   })

//   //   for (let i = 1; i <= 5; i++) {
//   //     await prisma.video.upsert({
//   //       where: { videoId: `uuid-${i}` },
//   //       update: {},
//   //       create: {
//   //         videoId: `uuid-${i}`,
//   //         title: `Video Tutorial ${i}`,
//   //         publishDate: new Date(),
//   //         viewsCount: i * 100,
//   //         description: `Description for tutorial ${i}.`,
//   //         url: `https://www.youtube.com/watch?v=d56mG7DezGs`,
//   //       },
//   //     })

//   //     await prisma.playlist.upsert({
//   //       where: { playlistId: `uuid-${i}` },
//   //       update: {},
//   //       create: {
//   //         playlistId: `uuid-${i}`,
//   //         name: `Playlist ${i}`,
//   //         description: `Description for playlist ${i}.`,
//   //         userId: user.userId,
//   //       },
//   //     })

//   //     await prisma.history.upsert({
//   //       where: { historyId: `uuid-${i}` },
//   //       update: {},
//   //       create: {
//   //         historyId: `uuid-${i}`,
//   //         viewDate: new Date(),
//   //         userId: user.userId,
//   //         videoId: `uuid-${i}`,
//   //       },
//   //     })

//   //     await prisma.videoComment.upsert({
//   //       where: { commentId: `uuid-${i}` },
//   //       update: {},
//   //       create: {
//   //         commentId: `uuid-${i}`,
//   //         comment: `Comment ${i} on the video.`,
//   //         datePosted: new Date(),
//   //         userId: user.userId,
//   //         videoId: `uuid-${i}`,
//   //       },
//   //     })

//   //     await prisma.videoTag.upsert({
//   //       where: { tagId: `uuid-${i}` },
//   //       update: {},
//   //       create: {
//   //         tagId: `uuid-${i}`,
//   //         tagName: `Tag${i}`,
//   //         videoId: `uuid-${i}`,
//   //       },
//   //     })
//   //   }

//   console.log(`Seeding finished.`)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
