'use client'

import { Button, Card, CardBody, Chip, Tooltip } from '@nextui-org/react'
import { deletePlaylist } from '@services/API'
import { truncateText } from '@utils/formatData.utils'
import { generateImageBluerURL } from '@utils/generateImageBluerUrl.utils'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { BsCollectionPlay, BsTrash3 } from 'react-icons/bs'
import { Thumbnail } from '../Thumbnail'

export interface PlaylistPreviewProps {
  id: string
  name: string
  description?: string
  thumbnail?: string
  videoCount: number
  onRemovePlaylist: (id: string) => void
  rollback: () => void
}

export const PlaylistPreview = ({
  id,
  name,
  description,
  thumbnail,
  videoCount,
  onRemovePlaylist,
  rollback,
}: PlaylistPreviewProps) => {
  const router = useRouter()

  const handleRemovePlaylist = async () => {
    onRemovePlaylist(id) // Optimistically remove the video

    try {
      await deletePlaylist(id)
      toast.success('Playlist deleted successfully.')
    } catch (error) {
      rollback() // Rollback if the removal fails
      toast.error('Failed to delete playlist.')
    }
  }

  return (
    <div className="relative">
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
          <>
            {/* Thumbnail */}
            <div className="relative">
              <>
                <Thumbnail
                  shadow="sm"
                  radius="lg"
                  alt={description || 'Playlist thumbnail'}
                  src={thumbnail || generateImageBluerURL(200, 200, 200)}
                />
              </>

              {/* Video count */}
              <div className="absolute bottom-2 left-2 z-10">
                <Chip size="sm" radius="sm" startContent={<BsCollectionPlay />}>
                  {videoCount}
                </Chip>
              </div>
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
          </>
        </CardBody>
      </Card>

      {/* Delete playlist */}
      <div className="absolute top-2 right-2 z-10">
        <Tooltip
          size="lg"
          color="foreground"
          offset={20}
          delay={0}
          closeDelay={0}
          content="Delete playlist"
        >
          <Button
            size="sm"
            aria-label="Delete playlist"
            color="danger"
            isIconOnly
            onClick={handleRemovePlaylist}
          >
            <BsTrash3 />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

// Display name
PlaylistPreview.displayName = 'PlaylistPreview'
