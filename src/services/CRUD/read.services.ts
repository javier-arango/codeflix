import type { CategoryKey } from '@constants/videoCategories.constants'
import prisma from '@lib/prisma'
import type { Channel, Playlist, Video } from '@prisma/client'
import type { PlaylistDetails } from 'types'

// Read services for Channels
export async function GetChannel(id: string) {
  // Find the channel in the database
  const channel: Channel | null = await prisma.channel.findUnique({
    where: {
      channelId: id,
    },
  })

  return channel
}

export async function GetChannelVideos(id: string) {
  // Find the channel and include the related videos
  const channelWithVideos: (Channel & { videos: Video[] }) | null =
    await prisma.channel.findUnique({
      where: {
        channelId: id,
      },
      include: {
        videos: true,
      },
    })

  return channelWithVideos
}

export async function GetVideo(id: string) {
  // Find the video in the database
  const video: Video | null = await prisma.video.findUnique({
    where: {
      videoId: id,
    },
  })

  return video
}

// Read services for Videos
export async function SearchVideosByCategory(categoryId: CategoryKey) {
  // Find all the videos
  if (categoryId === 'all') {
    const videos: Video[] = await prisma.video.findMany({
      orderBy: {
        viewsCount: 'desc',
      },
    })

    return videos
  }

  // Find the videos with the category id passed
  // Filter by viewsCount in descending order
  const videos: Video[] = await prisma.video.findMany({
    where: {
      categoryId: categoryId,
    },
    orderBy: {
      viewsCount: 'desc',
    },
  })

  return videos
}

export async function SearchVideosByQuery(query: string) {
  /**
   * Search for videos with the title matching the query
   * The search will look for at the video title and description that contain the query
   * The result will be then sorted out by views count
   */
  const videos: Video[] = await prisma.video.findMany({
    where: {
      OR: [{ title: { search: query } }, { description: { search: query } }],
    },
    orderBy: {
      viewsCount: 'desc',
    },
  })

  return videos
}

// Read services for Playlists
export async function GetPlaylist(id: string): Promise<PlaylistDetails | null> {
  // Find the playlist in the database
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: id,
    },
    include: {
      _count: {
        select: {
          videos: true,
        },
      },
    },
  })

  // If the playlist doesn't exist, return null
  if (!playlist) {
    return null
  }

  return {
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    userId: playlist.userId,
    videoCount: playlist._count.videos,
  } as PlaylistDetails
}

/**
 * Find and return the video if it exists in the playlist
 * @param playlistId
 * @param videoId
 * @returns
 */
export async function GetPlaylistVideo(playlistId: string, videoId: string) {
  // Check if the video already exist in the playlist
  const video = await prisma.playlist.findUnique({
    where: { id: playlistId },
    select: {
      videos: {
        where: { videoId: videoId },
      },
    },
  })

  return video
}

/**
 * Find and return the playlist with all the videos inside
 * @param id
 * @returns
 */
export async function GetPlaylistVideos(id: string) {
  // Find the playlist and include the videos that are inside
  const playlistWithVideos: (Playlist & { videos: Video[] }) | null =
    await prisma.playlist.findUnique({
      where: {
        id: id,
      },
      include: {
        videos: true,
      },
    })

  return playlistWithVideos
}

// Read services for Users
export async function GetUser(email: string) {
  // Find the user in the database
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  return user
}

export async function GetAllUserPlaylists(
  userId: string
): Promise<PlaylistDetails[]> {
  // Find all the user's playlists
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: userId,
    },
    include: {
      _count: {
        select: {
          videos: true,
        },
      },
    },
  })

  return playlists.map(
    (playlist) =>
      ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        userId: playlist.userId,
        videoCount: playlist._count.videos,
      }) as PlaylistDetails
  )
}
