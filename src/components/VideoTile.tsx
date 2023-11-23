import type { Video } from '@prisma/client'
import styles from '../styles/VideoTile.module.scss'
import Link from 'next/link'
import removeIcon from '../../public/assets/remove.png'
import Image from 'next/image'

type videoTileProps = {
  applyMargin: boolean
  video: Video
  showRemoveIcon: boolean
  vertical?: boolean
}

export default function VideoTile(props: videoTileProps) {
  const title = props.video.title
  const source = props.video.thumbnailUrl
  const showRemoveIcon = props.showRemoveIcon

  return (
    <Link className={styles.link} href={`/video/${props.video.videoId}`}>
      <div
        className={`${styles.tile} ${props.applyMargin && styles.margin} ${
          props.vertical && styles.verticalMargin
        }`}
      >
        <div
          className={styles.videoCont}
          style={{ backgroundImage: `url(${source})` }}
        >
          {showRemoveIcon && (
            <button className={styles.removeButton}>
              <Image
                className={styles.removeIcon}
                src={removeIcon}
                width={30}
                height={40}
                alt={'remove icon'}
              />
              {/* <img className={styles.removeIcon} src={removeIcon.src} /> */}
            </button>
          )}
        </div>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </Link>
  )
}
