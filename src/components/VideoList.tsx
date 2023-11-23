import type { Video } from '@prisma/client'
import Link from 'next/link'
import type { VideosResponse } from 'types'
import styles from '../styles/VideoList.module.scss'
import VideoTile from './VideoTile'

type VideosProps = {
  allVideos: boolean
  videos: VideosResponse
  categoryTitle?: string
  playlist: boolean
}

export default function VideoList(props: VideosProps) {
  const getVideos = (videos: VideosResponse) => {
    const array = []

    if (Array.isArray(videos.videos)) {
      for (let i = 0; i < videos.count; i++) {
        const video = videos.videos[i] as Video
        array.push(
          <VideoTile
            key={i}
            applyMargin={videos.count == 4 ? false : true}
            video={video}
            showRemoveIcon={props.playlist ? true : false}
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
              <Link href={''}>
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
