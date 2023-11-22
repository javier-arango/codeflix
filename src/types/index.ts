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

export interface CreatePlaylist {
  userEmail: string
  videoId?: string
  playlist: {
    name: string
    description?: string
  }
}
