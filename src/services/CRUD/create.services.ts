import { prisma } from '@lib/index'
import { type Video, type Channel } from '@prisma/client'

// Create video in database
export async function createVideo(video: Video) {
  await prisma.video.create({
    data: video,
  })

  return {
    statusCode: 201,
    message: 'Video successfully created.',
  }
}

// Create channel in database
export async function createChannel(channel: Channel) {
  await prisma.channel.create({
    data: channel,
  })

  return {
    statusCode: 201,
    message: 'Channel successfully created.',
  }
}
