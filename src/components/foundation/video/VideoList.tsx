'use client'

interface VideoListProps {
  videos: Video[]
}

import type { Video } from '@prisma/client'
import { parseVideoPreviewData } from '@utils/index'
import { AiFillWarning } from 'react-icons/ai'
import { VideoPreview } from './VideoPreview'

export const VideoList = ({ videos }: VideoListProps) => {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <AiFillWarning className="text-6xl text-default-500" />
        <h1 className="text-2xl font-bold">No videos found</h1>
        <p className="text-default-500 text-sm">
          Please try to refresh the page
        </p>
      </div>
    )
  }

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
