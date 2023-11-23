'use client'

import type { Video } from '@prisma/client'
import styles from '@styles/VideoView.module.scss'
import { fetcher } from '@utils/fetcher.utils'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from 'swr'
import bookmark from '../../public/assets/bookmark.svg'
import removeBookmark from '../../public/assets/bookmark_minus.svg'
import star from '../../public/assets/star.svg'
import starFill from '../../public/assets/star_fill.svg'
import { LoadingSpinner } from './LoadingSpinner'
import VideoListVertical from './VideoListVertical'
import { VideoPlayer } from './VideoPlayer'

interface VideoViewProps {
  videoId: string
}

export default function VideoView({ videoId }: VideoViewProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(false)
  // const [data, setData] = useState(false)

  // useEffect( () => {  }, [])

  // Fetch video details
  const { data, error, isLoading } = useSWR<Video>(
    `/api/videos/${videoId}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (isLoading) return <LoadingSpinner size="medium" />
  if (!data) return <div>No data</div>

  const handleActionsClick = (action: string) => {
    if (action == 'favorite') {
      setIsFavorite((prevIsFavorite) => !prevIsFavorite)
    } else if (action == 'bookmark') {
      setIsBookmark((prevIsBookmark) => !prevIsBookmark)
    }
  }

  return (
    <section id={styles.videoView}>
      <div id={styles.container} className="container">
        <div id={styles.view}>
          <div id={styles.player}>
            <VideoPlayer
              id="video-details-player"
              title={data.title}
              videoId={videoId}
            />
          </div>
          <div id={styles.infoActions}>
            <h1 id={styles.title}>{data?.title}</h1>
            <div id={styles.action}>
              <Image
                className={styles.actionsIcons}
                src={isFavorite ? starFill : star}
                alt="favorite icon"
                onClick={() => handleActionsClick('favorite')}
              />
              <Image
                className={styles.actionsIcons}
                src={isBookmark ? removeBookmark : bookmark}
                alt="bookmark icon"
                onClick={() => handleActionsClick('bookmark')}
              />
            </div>
          </div>
        </div>
        <div id={styles.videosList}>
          <VideoListVertical category={'ai'} />
        </div>
      </div>
    </section>
  )
}
