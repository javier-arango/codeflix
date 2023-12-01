'use client'

import type { Video } from '@prisma/client'
import { parseVideoPreviewData } from '@utils/index'
import { VideoPreview } from './VideoPreview'

interface VideoListProps {
  videos: Video[]
}

export const VideoList = ({ videos }: VideoListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoPreview
          alignment="vertical"
          hideDescription
          key={video.videoId}
          video={parseVideoPreviewData(video)}
        />
      ))}
    </div>
  )
}

// Display name
VideoList.displayName = 'VideoList'
