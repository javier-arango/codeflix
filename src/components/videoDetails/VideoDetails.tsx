'use client'

import { VideoPlayer } from '@components/foundation'
import { Spinner } from '@nextui-org/react'
import type { Video } from '@prisma/client'
import { fetcher } from '@utils/fetcher.utils'
import useSWR from 'swr'
import { Metadata } from './metadata/Metadata'

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
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Spinner size="lg" />
      </div>
    )
  if (!data) return <div>No data</div>

  return (
    <div>
      <VideoPlayer
        id="video-details-player"
        title={data.title}
        videoId={videoId}
      />

      <Metadata
        channelName={data.channelTitle}
        subscribersCount={1234532}
        videoTitle={data.title}
        videoDescription={data.description}
        viewsCount={data.viewsCount}
        likesCount={data.likesCount}
      />
    </div>
  )
}

// Display name
VideoDetails.displayName = 'VideoDetails'
