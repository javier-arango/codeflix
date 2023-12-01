'use client'

import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Tooltip,
} from '@nextui-org/react'
import {
  formatDescription,
  formatPublishedAt,
  formatToCompactNumber,
} from '@utils/index'

interface VideoMetadataProps {
  channelId: string
  channelName: string
  channelAvatar: string
  subscribersCount: number
  videoTitle: string
  videoDescription: string
  viewsCount: number
  likesCount: number
  commentCount: number
  publishedAt: Date
  children?: React.ReactNode | React.ReactNode[]
}

export const VideoMetadata = ({
  channelId,
  channelName,
  channelAvatar,
  subscribersCount,
  videoTitle,
  videoDescription,
  viewsCount,
  likesCount,
  commentCount,
  publishedAt,
  children,
}: VideoMetadataProps) => {
  return (
    <Card fullWidth radius="none">
      <CardHeader>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-default-900 text-lg font-semibold">
            {videoTitle}
          </h1>

          {/* Channel info */}
          <div className="flex flex-row justify-between">
            <div className="flex gap-4">
              {/* Channel avatar */}
              <Link href={`/channel/${channelId}`}>
                <Avatar showFallback size="md" src={channelAvatar} />
              </Link>

              {/* Channel name */}
              <div className="flex flex-col gap-1 items-start justify-center">
                <Tooltip
                  color="foreground"
                  offset={20}
                  delay={0}
                  closeDelay={0}
                  content={channelName}
                >
                  <Link href={`/channel/${channelId}`}>
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {channelName}
                    </h4>
                  </Link>
                </Tooltip>

                {/* Channel subscribers */}
                <h5 className="text-small tracking-tight text-default-400">
                  {formatToCompactNumber(subscribersCount)} subscribers
                </h5>
              </div>
            </div>

            {/* Save video to playlist */}
            {children}
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-3 py-0 text-small text-default-400">
        <Accordion fullWidth defaultExpandedKeys={['2']}>
          <AccordionItem
            key="1"
            aria-label={`${formatToCompactNumber(
              viewsCount
            )} views ${formatPublishedAt(publishedAt)}`}
            subtitle="Description"
            title={`${formatToCompactNumber(
              viewsCount
            )} views ${formatPublishedAt(publishedAt)}`}
          >
            {formatDescription(videoDescription)}
          </AccordionItem>
        </Accordion>
      </CardBody>

      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {formatToCompactNumber(likesCount)}
          </p>
          <p className=" text-default-400 text-small">Likes</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {formatToCompactNumber(commentCount)}
          </p>
          <p className="text-default-400 text-small">Comments</p>
        </div>
      </CardFooter>
    </Card>
  )
}

// Display name
VideoMetadata.displayName = 'VideoMetadata'
