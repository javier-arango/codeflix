import type { Video } from '@prisma/client'

export interface SearchResponse {
  count: number
  result: Video[]
}

export interface VideoListResponse {
  count: number
  videos: Video[]
}

export interface PlaylistDetails {
  id: string
  name: string
  description?: string
  thumbnail?: string
  userId: string
  videoCount: number
}

export interface PlaylistListResponse {
  count: number
  playlists: PlaylistDetails[]
}

export interface UpdatedProfile {
  firstName?: string
  lastName?: string
  avatar?: string
  bio?: string
}

export interface VideoExistResponse {
  videoExists: boolean
}

export interface CreatePlaylistRequest {
  userEmail: string
  videoId?: string
  playlist: {
    name: string
    description?: string
  }
}

export interface VideoPreviewDetails {
  videoId: string
  videoTitle: string
  videoThumbnail: string
  videoViewsCount: string
  videoPublishedAt: string
  videoDescription: string
  channelId: string
}

export interface UserDetails {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  bio: string
  createdAt: Date
  updatedAt: Date
}
