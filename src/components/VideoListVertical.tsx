import styles from '@styles/VerticalList.module.scss'
import type { VideosResponse } from 'types'
import VideoTile from './VideoTile'
import type { Video } from '@prisma/client'

type VerticalListProps = {
  videos: VideosResponse
}

export default function VideoListVertical(props: VerticalListProps) {
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
            showRemoveIcon={false}
            vertical
          />
        )
      }
    }
    return array
  }

  return (
    <div id={styles.cont}>{getVideos(props.videos)}</div>
  )
}
