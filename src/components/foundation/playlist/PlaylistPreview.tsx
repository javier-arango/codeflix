'use client'

import { Card, CardBody, Chip } from '@nextui-org/react'
import { truncateText } from '@utils/formatData.utils'
import { generateImageBluerURL } from '@utils/generateImageBluerUrl.utils'
import { useRouter } from 'next/navigation'
import { BsCollectionPlay } from 'react-icons/bs'
import { Thumbnail } from '../Thumbnail'

export interface PlaylistPreviewProps {
  id: string
  name: string
  description?: string
  thumbnail?: string
  videoCount: number
}

export const PlaylistPreview = ({
  id,
  name,
  description,
  thumbnail,
  videoCount,
}: PlaylistPreviewProps) => {
  const router = useRouter()

  return (
    <>
      <Card
        shadow="none"
        isPressable
        radius="none"
        allowTextSelectionOnPress
        className="lg:w-[210px] md:w-[210px] w-full"
        classNames={{
          base: 'bg-transparent',
        }}
        onPress={() => {
          router.push(`/user/playlist/${id}`)
        }}
      >
        <CardBody className="p-0 gap-2">
          {/* Thumbnail */}
          <div className="relative">
            <Thumbnail
              shadow="sm"
              radius="lg"
              alt={description || 'Playlist thumbnail'}
              src={thumbnail || generateImageBluerURL(200, 200, 200)}
            />
            <Chip
              size="sm"
              radius="sm"
              className="absolute bottom-2 right-2 z-10"
              startContent={<BsCollectionPlay />}
            >
              {videoCount}
            </Chip>
          </div>

          <div className="flex flex-col gap-1 h-full pr-4 text-left">
            {/* Playlist name */}
            <h1 className="font-bold text-base">{name}</h1>

            {/* Playlist Description */}
            {description && (
              <p className="text-default-500 text-sm">
                {truncateText(description, 25)}
              </p>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  )
}

// Display name
PlaylistPreview.displayName = 'PlaylistPreview'
