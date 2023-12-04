'use client'

import type { Video } from '@prisma/client'
import styles from '@styles/VideoView.module.scss'
import { fetcher } from '@utils/fetcherHelper.utils'
import useSWR from 'swr'
import { LoadingSpinner } from './LoadingSpinner'
import VideoActions from './VideoActions'
import VideoListVertical from './VideoListVertical'
import { VideoPlayer } from './VideoPlayer'
import React from 'react'

interface VideoViewProps {
  videoId: string
}

/**
 * Help format the description of the video
 * @param description
 * @returns Formatted string of the description
 */
export function formatDescription(description: string): JSX.Element[] {
  return description.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}

      <br />
    </React.Fragment>
  ))
}

export default function VideoView({ videoId }: VideoViewProps) {
  // Fetch video details
  const { data, error, isLoading } = useSWR<Video>(
    `/api/videos/${videoId}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (isLoading)
    return (
      <div id={styles.loadingContainer}>
        <LoadingSpinner size="medium" />
      </div>
    )
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
            <h1 id={styles.title}>{data.title}</h1>
            <VideoActions videoId={videoId} />
          </div>
          <div id={styles.moreInfo}>{formatDescription(data.description)}</div>
        </div>
        <div id={styles.videosList}>
          <VideoListVertical category={'ai'} />
        </div>
      </div>
    </section>
  )
}
