'use client'

import type { Video } from '@prisma/client'
import Link from 'next/link'
import type { CategoryKey, VideosResponse } from 'types'
import styles from '../styles/VideoList.module.scss'
import VideoTile from './VideoTile'
import {
  getVideosOfPlaylists,
  removeVideoFromPlaylist,
} from '@utils/fetcher.utils'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

type VideosProps = {
  allVideos: boolean
  videos: VideosResponse
  categoryTitle?: string
  categoryKey?: CategoryKey
  playlist: boolean
  playlistId?: string
}

export default function VideoList(props: VideosProps) {
  const [videos, setVideos] = useState([] as Video[])
  const [loading, setLoading] = useState(false)

  // Get videos of the playlist if the list is a playlist, otherwise just use the video passed by the props
  useEffect(() => {
    async function getVideos() {
      setLoading(true)
      const response: VideosResponse = await getVideosOfPlaylists(
        props.playlistId as string
      )

      if (response) {
        setVideos(response.videos)
        setLoading(false)
      }
    }

    if (props.playlist) {
      getVideos()
    } else {
      setVideos(props.videos.videos)
    }
  }, [props.playlistId, props.playlist, props.videos.videos])

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

      // Delete the video from the list
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
  const createVideosTile = (videosArray: Video[]) => {
    const videoTiles = []

    if (videosArray) {
      const quantity = props.allVideos ? videosArray.length : 4

      for (let i = 0; i < quantity; i++) {
        const video = videosArray[i]
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

  // Return a loader while fetching to get the videos
  if (loading)
    return (
      <div id={styles.noVideos}>
        <LoadingSpinner />
      </div>
    )

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
