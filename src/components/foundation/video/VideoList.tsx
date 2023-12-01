'use client'

import type { CategoryKey } from '@constants/videoCategories.constants'
import type { Video } from '@prisma/client'
import { parseVideoPreviewData } from '@utils/index'
import { useEffect, useState } from 'react'
import { SelectList } from '../SelectList'
import { WarningMessage } from '../WarningMessage'
import { VideoPreview } from './VideoPreview'

interface VideoListProps {
  videos: Video[]
  categories: CategoryKey[]
}

export const VideoList = ({ videos, categories }: VideoListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all')
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(videos)

  useEffect(() => {
    const newFilteredVideos =
      selectedCategory === 'all'
        ? videos
        : videos.filter((video) => video.categoryId === selectedCategory)

    setFilteredVideos(newFilteredVideos)
  }, [selectedCategory, videos])

  return (
    <div className="flex flex-col w-full ">
      <div className="sticky top-16 z-20 py-4 w-screen backdrop-blur-xl backdrop-saturate-150 bg-background/80">
        <SelectList
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div className='"px-2 py-4 lg:p-8 md:p-4"'>
        {filteredVideos.length === 0 ? (
          <WarningMessage
            title="No videos found"
            subtitle="Please try to refresh the page or select another category."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <VideoPreview
                alignment="vertical"
                hideDescription
                key={video.videoId}
                video={parseVideoPreviewData(video)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Display name
VideoList.displayName = 'VideoList'
