import {
  VideoDetailsSkeleton,
  VideoMetadata,
  VideoPlayer,
} from '@components/foundation'

import type { Channel, Video } from '@prisma/client'
import { getChannelDetails, getVideoDetails } from '@services/API'
import { Suspense } from 'react'
import { AiFillWarning } from 'react-icons/ai'

interface VideoDetailsProps {
  channelId: string
  videoDetails: Video
}

async function VideoDetails({ channelId, videoDetails }: VideoDetailsProps) {
  const channelDetails: Channel | null = await getChannelDetails(channelId)

  if (!channelDetails) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <AiFillWarning className="text-6xl text-default-500" />
        <h1 className="text-2xl font-bold">Channel not found</h1>
        <p className="text-default-500 text-sm">
          An error occurred while trying to fetch the channel
        </p>
      </div>
    )
  }

  return (
    <VideoMetadata
      channelId={channelId}
      channelAvatar={channelDetails.thumbnailUrl}
      commentCount={videoDetails.commentsCount}
      channelName={channelDetails.title}
      subscribersCount={channelDetails.subscribersCount}
      videoTitle={videoDetails.title}
      videoDescription={videoDetails.description}
      viewsCount={videoDetails.viewsCount}
      likesCount={videoDetails.likesCount}
      publishedAt={videoDetails.publishedAt}
    />
  )
}

export default async function VideoPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  // Fetch data from API
  const videoDetails: Video | null = await getVideoDetails(id)

  if (!videoDetails) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <AiFillWarning className="text-6xl text-default-500" />
        <h1 className="text-2xl font-bold">Video not found</h1>
        <p className="text-default-500 text-sm">
          An error occurred while trying to fetch the video
        </p>
      </div>
    )
  }

  return (
    <div>
      <VideoPlayer
        id="video-details-player"
        title={videoDetails.title}
        videoId={videoDetails.videoId}
      />

      <Suspense
        fallback={
          <div className="h-screen">
            <VideoDetailsSkeleton />
          </div>
        }
      >
        <VideoDetails
          channelId={videoDetails.channelId}
          videoDetails={videoDetails}
        />
      </Suspense>
    </div>
  )
}

// Display name
VideoPage.displayName = 'VideoPage'
