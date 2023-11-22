import type { Video } from '@prisma/client'

export interface VideosResponse {
  count: number
  videos: Video[]
}
