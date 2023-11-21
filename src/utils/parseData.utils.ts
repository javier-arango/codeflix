import type { Video } from '@prisma/client'
import type { VideoPreviewDetails } from 'types'
import {
  formatPublishedAt,
  formatToCompactNumber,
  truncateText,
} from './formatData.utils'

export function parseVideoPreviewData(video: Video): VideoPreviewDetails {
  return {
    videoId: video.videoId,
    videoTitle: video.title,
    videoThumbnail: video.thumbnailUrl,
    videoViewsCount: formatToCompactNumber(video.viewsCount),
    videoPublishedAt: formatPublishedAt(video.publishedAt),
    videoDescription: truncateText(video.description, 50),
    channelId: video.channelId,
  }
}
