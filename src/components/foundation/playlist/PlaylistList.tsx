'use client'

import { supabase } from '@lib/supabaseClient'
import { Divider } from '@nextui-org/react'
import type { Video } from '@prisma/client'
import { useEffect, useState } from 'react'
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
  const [videos, setVideos] = useState<Video[]>(playlistVideos.videos)

  const handleVideoRemove = (videoId: string) => {
    setVideos((videos) => videos.filter((video) => video.videoId !== videoId))
  }

  useEffect(() => {
    // Set up real-time subscription
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: '_PlaylistToVideo' },
        (payload) => {
          console.log(payload)
          //   if (
          //     payload.eventType === 'INSERT' &&
          //     payload.new.playlistId === playlistId
          //   ) {
          //     setVideos((currentVideos: Video[]) => [
          //       ...currentVideos,
          //       payload.new.video,
          //     ])
          //   } else if (
          //     payload.eventType === 'DELETE' &&
          //     payload.old.playlistId === playlistId
          //   ) {
          //     setVideos((currentVideos: Video[]) =>
          //       currentVideos.filter(
          //         (video) => video.videoId !== payload.old.videoId
          //       )
          //     )
          //   }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [playlistId])

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
              itemIndex={(index += 1)}
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
}

// Display name
PlaylistList.displayName = 'PlaylistList'
