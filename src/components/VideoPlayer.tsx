'use client'

import styles from '@styles/VideoPlayer.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import type { YouTubeProps } from 'react-youtube'
import YouTube from 'react-youtube'

export const VideoPlayer = ({
  id,
  videoId,
  className,
  style,
  title,
  opts,
}: YouTubeProps) => {
  const defaultOpts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      rel: 0,
      autoplay: 1,
      frameborder: 0,
      cc_lang_pref: 'en',
      cc_load_policy: 1,
      iv_load_policy: 3,
    },
  }

  // Loading state for the player
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const [isPlayerReady, setPlayerReady] = useState(false)
  const onPlayerReady = () => {
    setPlayerReady(true)
  }

  // Error state for the player
  const [hasError, setError] = useState(false)
  const onError = () => {
    setError(true)
  }

  if (hasError) {
    return (
      <div className={styles.errorMessage}>
        Video cannot be played at the moment.
      </div>
    )
  }

  return (
    <>
      <div className={styles.videoWrapper}>
        {!isPlayerReady && (
          <Image
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className={styles.videoPlayer}
            style={{ opacity: isPlayerReady ? 0 : 1 }}
            priority
            fill
          />
        )}

        <YouTube
          id={id}
          videoId={videoId}
          className={styles.videoPlayer + ' ' + className}
          style={style}
          title={title}
          opts={defaultOpts || opts}
          loading="lazy"
          onReady={onPlayerReady}
          onError={onError}
        />
      </div>
    </>
  )
}

// Display name
VideoPlayer.displayName = 'VideoPlayer'
