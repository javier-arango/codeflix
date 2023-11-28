'use client'

import { Avatar, Card, CardBody, Link, Tooltip } from '@nextui-org/react'
import type { Channel } from '@prisma/client'
import { fetcher } from '@utils/fetcher.utils'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import type { VideoPreviewDetails } from 'types'
import { Thumbnail } from '../Thumbnail'
import { ChannelProfileSkeleton } from '../skeleton'

interface VideoPreviewProps {
  video: VideoPreviewDetails
  alignment?: 'horizontal' | 'vertical'
  hideAvatar?: boolean
  hideDescription?: boolean
  fullWidth?: boolean
}

export const VideoPreview = ({
  video,
  hideAvatar = false,
  fullWidth = true,
  hideDescription = false,
  alignment = 'horizontal',
}: VideoPreviewProps) => {
  const {
    videoId,
    channelId,
    videoTitle,
    videoDescription,
    videoThumbnail,
    videoViewsCount,
    videoPublishedAt,
  } = video

  const router = useRouter()

  // Fetch channel details
  const { data, isLoading } = useSWR<Channel>(
    `/api/channel/${channelId}`,
    fetcher
  )

  const alignmentClasses =
    alignment === 'horizontal'
      ? 'grid grid-cols-6 md:grid-cols-12 lg:gap-5 md:gap-4 gap-3 items-center justify-center'
      : 'flex flex-col'

  return (
    <>
      <Card
        shadow="none"
        fullWidth={fullWidth}
        isPressable
        radius="none"
        allowTextSelectionOnPress
        classNames={{
          base: 'bg-transparent',
        }}
        onPress={() => {
          router.push(`/video/${videoId}`)
        }}
      >
        <CardBody className="p-0">
          <div className={alignmentClasses}>
            {/* Left Size */}
            <div className="relative col-span-6 md:col-span-4">
              <Thumbnail
                shadow="sm"
                radius="lg"
                alt={videoTitle}
                src={videoThumbnail}
              />
            </div>

            {/* Right Size */}
            <div className="flex flex-col col-span-6 md:col-span-8 lg:gap-3 md:gap-2 gap-1 h-full px-4 md:pl-0 lg:pl-0 md:pr-5 lg:pr-3">
              {/* Video Info (only horizontal) */}
              {alignment === 'horizontal' && (
                <div className="flex flex-col gap-1 md:gap-0">
                  {/* Video title */}
                  <h1 className="font-bold lg:text-xl md:text-lg text-base">
                    {videoTitle}
                  </h1>

                  {/* Video stats */}
                  <p className="text-default-500 text-sm">
                    {videoViewsCount} • {videoPublishedAt}
                  </p>
                </div>
              )}

              {/* Channel Info */}
              {isLoading && <ChannelProfileSkeleton />}
              {data && !isLoading && (
                <div
                  className={`flex gap-4 ${
                    alignment === 'vertical' && 'items-start pt-2'
                  }`}
                >
                  {/* Channel Avatar */}
                  {!hideAvatar && (
                    <Link href={`/channel/${channelId}`}>
                      <Avatar showFallback size="md" src={data.thumbnailUrl} />
                    </Link>
                  )}

                  {/* Channel Info */}
                  <div className="flex flex-col gap-1 items-start justify-center">
                    {/* Video title (only vertical) */}
                    {alignment === 'vertical' && (
                      <h1 className="font-bold text-base">{videoTitle}</h1>
                    )}

                    {/* Channel title */}
                    <Tooltip
                      size="lg"
                      color="foreground"
                      offset={20}
                      delay={0}
                      closeDelay={0}
                      content={data.title}
                    >
                      <Link href={`/channel/${channelId}`}>
                        <h4 className="text-sm font-semibold leading-none text-default-500">
                          {data.title}
                        </h4>
                      </Link>
                    </Tooltip>

                    {/* Video stats (only vertical) */}
                    {alignment === 'vertical' && (
                      <p className="text-default-500 text-sm">
                        {videoViewsCount} views • {videoPublishedAt}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Video Description */}
              {!hideDescription && (
                <p className="text-default-500 text-sm">{videoDescription}</p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

// Display name
VideoPreview.displayName = 'VideoPreview'
