'use client'

import type { Video } from '@prisma/client'
import Link from 'next/link'
import type { CategoryKey, VideosResponse } from 'types'
import styles from '../styles/VideoList.module.scss'
import VideoTile from './VideoTile'
import { removeVideoFromPlaylist } from '@utils/fetcher.utils'
import toast from 'react-hot-toast'
import { useState } from 'react'

type VideosProps = {
  allVideos: boolean
  videos: VideosResponse
  categoryTitle?: string
  categoryKey?: CategoryKey
  playlist: boolean
  playlistId?: string
}

export default function VideoList(props: VideosProps) {
  const [videos, setVideos] = useState(props.videos.videos)

  console.log(props.categoryTitle, props.videos.count)

  /**
   * Remove a video from a playlist
   * @param videoId The video ID that you want to remove
   */
  const handleDeleteVideo = async (videoId: string) => {
    if (props.playlistId) {
      const res = await removeVideoFromPlaylist(videoId, props.playlistId)

      // Display error message or success if video was removed or not
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success(res.message)
      }

      // Delete the component from the list
      setVideos(
        (prevVideos) => prevVideos?.filter((video) => video.videoId !== videoId)
      )
    }
  }

  /**
   * Create the tile component for each video
   * @param videos the array of the videos response
   * @returns An array of VideoTile component
   */
  const createVideosTile = (videos: Video[]) => {
    const videoTiles = []

    if (videos) {
      const quantity = props.allVideos ? videos.length : 4

      for (let i = 0; i < quantity; i++) {
        const video = videos[i]
        videoTiles.push(
          <VideoTile
            key={video.videoId}
            applyMargin={videos.length == 4 ? false : true}
            video={video}
            showRemoveIcon={props.playlist ? true : false}
            deleteHandler={handleDeleteVideo}
          />
        )
      }
    }
    return videoTiles
  }

  // If no videos and it is a playlist, display that message
  if (videos.length == 0)
    return <div id={styles.noVideos}>No videos in this playlist</div>

  return (
    <section id={styles.videosSection}>
      <div className="container">
        <div className="main">
          {!props.allVideos && (
            <div id={styles.header}>
              <h1 id={styles.categoryTitle}>{props.categoryTitle}</h1>
              <Link href={`/categories/${props.categoryKey || ''}`}>
                <h2 id={styles.viewAll}>View all</h2>
              </Link>
            </div>
          )}
          <div
            className={props.allVideos ? styles.allVideos : styles.someVideos}
          >
            {createVideosTile(videos)}
          </div>
        </div>
      </div>
    </section>
  )
}
