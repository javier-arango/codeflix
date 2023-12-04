// Export everything from the types folder here

import type { Playlist, Video } from '@prisma/client'
import type { StaticImageData } from 'next/image'

export type CategoryKey =
  | 'algorithms'
  | 'ai'
  | 'db'
  | 'cybersecurity'
  | 'datascience'
  | 'frontend'
  | 'fullstack'
  | 'iot'
  | 'ml'
  | 'mobile'
  | 'os'
  | 'programming'
  | 'uiux'

export interface VideosResponse {
  count: number
  videos: Video[]
}

export type CategoryInfo = {
  key: CategoryKey
  name: string
  img: StaticImageData
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
