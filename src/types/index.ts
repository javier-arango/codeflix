import type { Playlist, Video } from '@prisma/client'

export interface SearchResponse {
  count: number
  result: Video[]
}

export interface VideoListResponse {
  count: number
  videos: Video[]
}

export interface PlaylistListResponse {
  count: number
  playlists: Playlist[]
}

export interface UpdatedProfile {
  firstName?: string
  lastName?: string
  avatar?: string
  bio?: string
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
