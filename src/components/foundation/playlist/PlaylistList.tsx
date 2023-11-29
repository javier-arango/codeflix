'use client'

import { Divider } from '@nextui-org/react'
import type { Video } from '@prisma/client'
import useOptimistic from 'hooks/useOptimistic.hooks'
import type { VideoListResponse } from 'types'
import { WarningMessage } from '../WarningMessage'
import { PlaylistItem } from './PlaylistItem'

interface PlaylistListProps {
  playlistId: string
  playlistVideos: VideoListResponse
}

export const PlaylistList = ({
  playlistId,
  playlistVideos,
}: PlaylistListProps) => {
  const [videos, setOptimisticVideos, rollbackVideos] = useOptimistic<Video[]>(
    playlistVideos.videos
  )

  const handleVideoRemove = (videoId: string) => {
    // Optimistically remove the video
    setOptimisticVideos((prevVideos) =>
      prevVideos.filter((video) => video.videoId !== videoId)
    )
  }

  return (
    <>
      {videos.length > 0 ? (
        <div className="w-full">
          {videos.map((video, index) => (
            <PlaylistItem
              key={video.videoId}
              playlistId={playlistId}
              video={video}
              onRemoveVideo={handleVideoRemove}
              itemIndex={index + 1}
              rollback={rollbackVideos}
            />
          ))}
          <Divider />
        </div>
      ) : (
        <WarningMessage
          title="This playlist is empty."
          subtitle="Please add videos to it."
        />
      )}
    </>
  )

  // const [videos, setVideos] = useState<Video[]>(playlistVideos.videos)

  // const handleVideoRemove = (videoId: string) => {
  //   setVideos((videos: Video[]) =>
  //     videos.filter((video: Video) => video.videoId !== videoId)
  //   )
  // }

  // return (
  //   <>
  //     {videos.length > 0 ? (
  //       <div className="w-full">
  //         {videos.map((video, index) => (
  //           <PlaylistItem
  //             key={video.videoId}
  //             playlistId={playlistId}
  //             video={video}
  //             onRemoveVideo={handleVideoRemove}
  //             itemIndex={(index += 1)}
  //           />
  //         ))}

  //         <Divider />
  //       </div>
  //     ) : (
  //       <WarningMessage
  //         title="This playlist is empty."
  //         subtitle="Please add videos to it."
  //       />
  //     )}
  //   </>
  // )
}

// Display name
PlaylistList.displayName = 'PlaylistList'
