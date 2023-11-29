import prisma from '@lib/prisma'
import type { Channel, User, Video } from '@prisma/client'
import { hash } from 'bcrypt'
import type { CreatePlaylistRequest } from 'types'

// Create services for Channels
export async function CreateChannel(channel: Channel): Promise<boolean> {
  try {
    // Create the channel if it don't exist
    await prisma.channel.create({
      data: channel,
    })

    return true
  } catch (err) {
    console.error(`Error creating channel: ${err}`)
    return false
  }
}

// Create services for Videos
export async function UploadVideo(video: Video): Promise<boolean> {
  try {
    // Upload the video if it don't exist
    await prisma.video.create({
      data: video,
    })

    return true
  } catch (err) {
    console.error(`Error uploading video: ${err}`)
    return false
  }
}

// Create services for Playlists
export async function CreatePlaylist(
  createPlaylist: CreatePlaylistRequest
): Promise<boolean> {
  const { playlist, userEmail, videoId } = createPlaylist

  /**
   * The user is able to create a playlist with or without a video
   * If the user creates a playlist with a video, the video will be added to the playlist
   * If the user creates a playlist without a video, the playlist will be created without a video
   *
   * Example input with video:
   * {
   *  "userEmail": "test@test.com"
   *  "videoId": "RBSGKlAvoiM",
   *  "playlist": {
   *      "name": "Algorithm and Data Structures",
   *      "description": "A playlist about algorithms and data structures"
   * }
   *
   * Example input without video:
   * {
   * "userEmail": "test@test.com"
   * "playlist": {
   *     "name": "Algorithm and Data Structures",
   *    "description": "A playlist about algorithms and data structures"
   * }
   */
  try {
    await prisma.playlist.create({
      data: {
        name: playlist.name,
        description: playlist.description ?? '',
        user: { connect: { email: userEmail } },
        ...(videoId && { videos: { connect: [{ videoId }] } }),
      },
    })

    return true
  } catch (err) {
    console.error(`Error creating playlist: ${err}`)
    return false
  }
}

// Create services for Users
export async function CreateUser(user: User): Promise<boolean> {
  try {
    // Create the user if they don't exist
    await prisma.user.create({
      data: {
        ...user,
        password: await hash(user.password, 12),
      },
    })

    return true
  } catch (err) {
    console.error(`Error creating user: ${err}`)
    return false
  }
}
