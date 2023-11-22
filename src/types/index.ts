import type { Playlist, Video } from '@prisma/client'

export interface VideoListResponse {
  count: number
  videos: Video[]
}

export interface PlaylistListResponse {
  count: number
  playlists: Playlist[]
}
