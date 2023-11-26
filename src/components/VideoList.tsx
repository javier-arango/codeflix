'use client'

import type { Video } from '@prisma/client'
import Link from 'next/link'
import type { CategoryKey, VideosResponse } from 'types'
import styles from '../styles/VideoList.module.scss'
import VideoTile from './VideoTile'
import { removeVideoFromPlaylist } from '@utils/fetcher.utils'

type VideosProps = {
  allVideos: boolean
  videos: VideosResponse
  categoryTitle?: string
  categoryKey?: CategoryKey
  playlist: boolean
  playlistId?: string
}

export default function VideoList(props: VideosProps) {
  // Remove a video from the playlist
  const handleDeleteVideo = async (videoId: string) => {
    console.log(videoId)
    if (props.playlistId) {
      const res = await removeVideoFromPlaylist(videoId, props.playlistId)

      console.log(res)
    }
  }

  const getVideos = (videos: VideosResponse) => {
    const array = []

    if (Array.isArray(videos.videos)) {
      const quantity = props.allVideos ? videos.count : 4

      for (let i = 0; i < quantity; i++) {
        const video = videos.videos[i] as Video
        array.push(
          <VideoTile
            key={i}
            applyMargin={videos.count == 4 ? false : true}
            video={video}
            showRemoveIcon={props.playlist ? true : false}
            deleteHandler={handleDeleteVideo}
          />
        )
      }
    }
    return array
  }

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
            {getVideos(props.videos)}
          </div>
        </div>
      </div>
    </section>
  )
}
