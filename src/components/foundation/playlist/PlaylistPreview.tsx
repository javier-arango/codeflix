'use client'

import { Card, CardBody, CardFooter, Chip } from '@nextui-org/react'
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
        style={{ width: '210px' }}
        classNames={{
          base: 'bg-transparent',
        }}
        onPress={() => {
          router.push(`/user/playlist/${id}`)
        }}
      >
        <CardBody className="p-0">
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
        </CardBody>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </>
  )
}

// Display name
PlaylistPreview.displayName = 'PlaylistPreview'
