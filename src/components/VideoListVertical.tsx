import styles from '@styles/VerticalList.module.scss'
import type { CategoryKey, VideosResponse } from 'types'
import VideoTile from './VideoTile'
import type { Video } from '@prisma/client'

type VerticalListProps = {
  category: CategoryKey
}

async function getVideos(category: CategoryKey) {
  const response = await fetch(
    `http://localhost:3000/api/videos?category=${category}`
  )

  if (!response || !response.ok) {
    return null
  }

  const data: VideosResponse = await response.json()

  return data
}

export default async function VideoListVertical(props: VerticalListProps) {
  const data: VideosResponse | null = await getVideos(props.category)

  if (!data) {
    return null
  }

  const createVideoTiles = (videos: VideosResponse) => {
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

  return <div id={styles.cont}>{createVideoTiles(data)}</div>
}
