'use client'

import type { Video } from '@prisma/client'
import styles from '@styles/VideoView.module.scss'
import { fetcher } from '@utils/fetcher.utils'
import Image from 'next/image'
import useSWR from 'swr'
import type { VideosResponse } from 'types'
import bookmark from '../../public/assets/bookmark.svg'
import star from '../../public/assets/star.svg'
import { LoadingSpinner } from './LoadingSpinner'
import { VideoPlayer } from './VideoPlayer'
import VideoListVertical from './VideoListVertical'

interface VideoViewProps {
  videoId: string
}

const responseTemp: VideosResponse = {
  count: 4,
  videos: [
    {
      videoId: 'string',
      url: 'string',
      title: 'string',
      duration: 'string',
      categoryId: 'string',
      description: 'string',
      publishedAt: new Date(),
      channelTitle: 'string',
      thumbnailUrl: 'string',
      viewsCount: 12,
      likesCount: 45,
      commentsCount: 45,
      channelId: 'string',
    },
    {
      videoId: 'string',
      url: 'string',
      title: 'string',
      duration: 'string',
      categoryId: 'string',
      description: 'string',
      publishedAt: new Date(),
      channelTitle: 'string',
      thumbnailUrl: 'string',
      viewsCount: 12,
      likesCount: 45,
      commentsCount: 45,
      channelId: 'string',
    },
    {
      videoId: 'string',
      url: 'string',
      title: 'string',
      duration: 'string',
      categoryId: 'string',
      description: 'string',
      publishedAt: new Date(),
      channelTitle: 'string',
      thumbnailUrl: 'string',
      viewsCount: 12,
      likesCount: 45,
      commentsCount: 45,
      channelId: 'string',
    },
    {
      videoId: 'string',
      url: 'string',
      title: 'string',
      duration: 'string',
      categoryId: 'string',
      description: 'string',
      publishedAt: new Date(),
      channelTitle: 'string',
      thumbnailUrl: 'string',
      viewsCount: 12,
      likesCount: 45,
      commentsCount: 45,
      channelId: 'string',
    }
  ],
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
          <VideoListVertical videos={responseTemp}/>
        </div>
      </div>
    </section>
  )
}
