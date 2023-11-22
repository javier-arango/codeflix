import prisma from '@lib/prisma'
import type { UpdatedProfile } from 'types'

// Update services for Users
export async function UpdateUser(
  email: string,
  updatedValues: UpdatedProfile
): Promise<boolean> {
  try {
    // Update the user if it exists
    await prisma.user.update({
      where: { email: email },
      data: updatedValues,
    })

    return true
  } catch (err) {
    console.error(`Error updating user: ${err}`)
    return false
  }
}

// Update services for Playlist
/**
 * Update the playlist with a new video (add a video to the playlist)
 * @param playlistId
 * @param videoIDToConnect
 * @returns
 */
export async function UpdatePlaylist(
  playlistId: string,
  videoIDToConnect: string
): Promise<boolean> {
  try {
    // Update the playlist if it exists
    await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        videos: {
          connect: {
            videoId: videoIDToConnect,
          },
        },
      },
    })

    return true
  } catch (err) {
    console.error(`Error updating playlist: ${err}`)
    return false
  }
}

export async function RemoveVideoFromPlaylist(
  playlistId: string,
  videoIDToRemove: string
): Promise<boolean> {
  // Update the playlist if it exists
  const updatedPlaylist = await prisma.playlist.update({
    where: { id: playlistId },
    data: {
      videos: {
        disconnect: {
          videoId: videoIDToRemove,
        },
      },
    },
  })

  if (!updatedPlaylist) {
    return false
  }

  return true
}
