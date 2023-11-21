'use client'

import type { Video } from '@prisma/client'
import styles from '@styles/VideoView.module.scss'
import { fetcher } from '@utils/fetcher.utils'
import useSWR from 'swr'
import { LoadingSpinner } from './LoadingSpinner'
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
            <div id={styles.action}></div>
          </div>
        </div>
        <div id={styles.videosList}></div>
      </div>
    </section>
  )
}
