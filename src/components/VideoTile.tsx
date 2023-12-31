'use client'

import type { Video } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import removeIcon from '../../public/assets/remove.png'
import styles from '../styles/VideoTile.module.scss'

type videoTileProps = {
  applyMargin: boolean
  video: Video
  showRemoveIcon: boolean
  vertical?: boolean
  deleteHandler?: (videoId: string) => void
}

export default function VideoTile(props: videoTileProps) {
  const id = props.video.videoId
  const title = props.video.title
  const source = props.video.thumbnailUrl
  const showRemoveIcon = props.showRemoveIcon

  /**
   * Handle when the user click the remove Icon to remove a video from a playlist
   * @param videoId
   */
  const removeVideoFromPlaylist = (videoId: string) => {
    if (props.deleteHandler) {
      props.deleteHandler(videoId)
    }
  }

  return (
    <div
      className={`${styles.tile} ${props.applyMargin && styles.margin} ${
        props.vertical && styles.verticalMargin
      }`}
    >
      <Link className={styles.link} href={`/video/${props.video.videoId}`}>
        <div
          className={styles.videoCont}
          style={{ backgroundImage: `url(${source})` }}
        ></div>
        <h2 className={styles.title}>{title}</h2>
      </Link>
      {showRemoveIcon && (
        <button
          className={styles.removeButton}
          onClick={() => removeVideoFromPlaylist(id)}
        >
          <Image
            className={styles.removeIcon}
            src={removeIcon}
            width={30}
            height={40}
            alt={'remove icon'}
          />
        </button>
      )}
    </div>
  )
}
