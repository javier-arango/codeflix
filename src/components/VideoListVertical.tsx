import styles from '@styles/VerticalList.module.scss'
import type { CategoryKey, VideosResponse } from 'types'
import VideoTile from './VideoTile'
import type { Video } from '@prisma/client'
import { getVideos } from '@utils/fetcher.utils'

type VerticalListProps = {
  category: CategoryKey
}

export default async function VideoListVertical(props: VerticalListProps) {
  const data: VideosResponse | null = await getVideos(props.category)

  if (!data) {
    return null
  }

  const createVideoTiles = (videos: VideosResponse) => {
    const videoTiles = []

    if (Array.isArray(videos.videos)) {
      for (let i = 0; i < videos.count; i++) {
        const video = videos.videos[i] as Video
        videoTiles.push(
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
    return videoTiles
  }

  return <div id={styles.cont}>{createVideoTiles(data)}</div>
}
