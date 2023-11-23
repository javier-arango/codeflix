'use client'

import type { Video } from '@prisma/client'
import { fetcher } from '@utils/fetcher.utils'
import useSWR from 'swr'
import { LoadingSpinner } from './LoadingSpinner'

interface VideoDetailsProps {
  videoId: string
}

export const VideoDetails = ({ videoId }: VideoDetailsProps) => {
  // Fetch video details
  const { data, error, isLoading } = useSWR<Video>(
    `/api/videos/${videoId}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (isLoading) return <LoadingSpinner size="medium" />
  if (!data) return <div>No data</div>

  return (
    <div>
      {/* <VideoPlayer
        id="video-details-player"
        title={data.title}
        videoId={videoId}
      /> */}

      <div>
        <h1>{data?.title}</h1>
        <p>{data.description}</p>
        <p>Views Count {data.viewsCount}</p>
        <p>Likes Count {data.likesCount}</p>
      </div>
    </div>
  )
}

// Display name
VideoDetails.displayName = 'VideoDetails'
