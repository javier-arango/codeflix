import type { Video } from '@prisma/client'

export interface SearchResponse {
  count: number
  result: Video[]
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
