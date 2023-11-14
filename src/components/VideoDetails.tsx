'use client'

import type { Video } from '@prisma/client'
import { fetcher } from '@utils/fetcher.utils'
import useSWR from 'swr'
import { VideoPlayer } from './VideoPlayer'

interface VideoDetailsProps {
  videoId: string
}

export const VideoDetails = ({ videoId }: VideoDetailsProps) => {
  // Fetch video details
  const { data, error, isLoading } = useSWR<Video>(
    `/api/videos/${videoId}`,
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  if (!data) return <div>no data</div>

  return (
    <div>
      <VideoPlayer id="video-details-player" videoId={videoId} />

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
