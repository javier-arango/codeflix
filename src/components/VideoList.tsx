import Link from 'next/link'
import styles from '../styles/VideoList.module.scss'
import VideoTile from './VideoTile'
import { Video } from '@prisma/client'
import { CategoryResponse } from 'app/(pages)/categories/[category]/page'

type VideosProps = {
  categoryTitle: string
  allVideos: boolean
  videos: CategoryResponse
}

export default function VideoList(props: VideosProps) {

  const getVideos = (videos: CategoryResponse) => {
    const array = []

    if (Array.isArray(videos.videos)) {
      for (let i = 1; i < videos.count; i++) {
        const video = videos.videos[i] as Video
        array.push(
          <VideoTile
            key={i}
            applyMargin={videos.count == 4 ? false : true}
            video={video}
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
