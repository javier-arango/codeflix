import { Video } from '@prisma/client'
import Image from 'next/image'
import styles from '../styles/VideoTile.module.scss'
import Link from 'next/link'

type videoTileProps = {
  applyMargin: boolean
  video: Video
}

export default function VideoTile(props: videoTileProps) {
  const title = props.video.title
  const source = props.video.thumbnailUrl

  return (
    <Link href={`/video/${props.video.videoId}`}>
      <div className={`${styles.tile} ${props.applyMargin && styles.margin}`}>
        <div className={styles.videoCont}>
          <Image width={300} height={300} src={source} alt={'thumbnail'} />
        </div>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </Link>
  )
}
