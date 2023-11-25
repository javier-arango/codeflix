'use client'

import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react'
import type { Channel } from '@prisma/client'
import {
  formatDescription,
  formatToCompactNumber,
} from '@utils/formatData.utils'

export const ChannelMetadata = ({
  title,
  description,
  thumbnailUrl,
  subscribersCount,
  publishedAt,
  viewsCount,
}: Channel) => {
  return (
    <Card
      shadow="none"
      fullWidth
      radius="none"
      classNames={{
        base: 'bg-transparent',
      }}
    >
      <CardHeader>
        <div className="flex flex-row justify-between">
          <div className="flex gap-4">
            {/* Channel avatar */}
            <Avatar
              showFallback
              className="lg:w-32 lg:h-32"
              radius="full"
              size="lg"
              src={thumbnailUrl}
            />

            {/* Channel info */}
            <div className="flex flex-col gap-1 items-start justify-center">
              <h1 className="text-xl lg:text-3xl font-bold leading-none text-default-600">
                {title}
              </h1>

              {/* Channel subscribers */}
              <h5 className="text-small lg:text-base tracking-tight text-default-400">
                {`${formatToCompactNumber(subscribersCount)} subscribers`}
              </h5>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-3 text-small text-default-400">
        <Accordion fullWidth defaultExpandedKeys={['2']} variant="shadow">
          <AccordionItem
            key="1"
            aria-label={`${formatToCompactNumber(
              viewsCount
            )} views . Joined on ${new Date(publishedAt).toLocaleDateString()}`}
            subtitle="Description"
            title={`${formatToCompactNumber(
              viewsCount
            )} views • Joined on ${new Date(publishedAt).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }
            )}`}
          >
            {formatDescription(description)}
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  )
}

// Display name
ChannelMetadata.displayName = 'ChannelMetadata'
