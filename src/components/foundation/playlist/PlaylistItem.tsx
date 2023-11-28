'use client'

import { Button } from '@nextui-org/react'
import type { Video } from '@prisma/client'
import { removeVideoFromPlaylist } from '@services/API'
import { parseVideoPreviewData } from '@utils/parseData.utils'
import toast from 'react-hot-toast'
import { BsTrash3 } from 'react-icons/bs'
import { VideoPreview } from '../video/VideoPreview'

interface PlaylistItemProps {
  video: Video
  playlistId: string
  itemIndex: number
}

export const PlaylistItem = ({
  video,
  playlistId,
  itemIndex,
}: PlaylistItemProps) => {
  const handleRemoveVideo = async () => {
    const videoRemoved = await removeVideoFromPlaylist(
      playlistId,
      video.videoId
    )

    if (videoRemoved.ok) {
      toast.success(videoRemoved)
      // router.refresh()
    } else {
      toast.error(videoRemoved.error)
    }
  }

  return (
    <div className="flex flex-row justify-between items-center hover:bg-content2 p-4 rounded-large">
      <div className="flex flex-row items-center gap-5 relative">
        <h3 className="font-extrabold">{itemIndex}</h3>
        <VideoPreview
          hideDescription
          hideAvatar
          alignment="horizontal"
          video={parseVideoPreviewData(video)}
        />
      </div>
      <Button
        isIconOnly
        color="danger"
        aria-label="Remove video from playlist"
        onClick={handleRemoveVideo}
      >
        <BsTrash3 />
      </Button>
    </div>
  )
}

// Display name
PlaylistItem.displayName = 'PlaylistItem'
