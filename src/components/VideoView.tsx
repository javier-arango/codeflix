'use client'

import type { Video } from '@prisma/client'
import styles from '@styles/VideoView.module.scss'
import { fetcher } from '@utils/fetcher.utils'
import Image from 'next/image'
import useSWR from 'swr'
import bookmark from '../../public/assets/bookmark.svg'
import star from '../../public/assets/star.svg'
import { LoadingSpinner } from './LoadingSpinner'
import VideoListVertical from './VideoListVertical'
import { VideoPlayer } from './VideoPlayer'

interface VideoViewProps {
  videoId: string
}

export default function VideoView({ videoId }: VideoViewProps) {
  // Fetch video details
  const { data, error, isLoading } = useSWR<Video>(
    `/api/videos/${videoId}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (isLoading) return <LoadingSpinner size="medium" />
  if (!data) return <div>No data</div>

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
                src={star}
                alt="bookmark icon"
              />
              <Image
                className={styles.actionsIcons}
                src={bookmark}
                alt="bookmark icon"
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
