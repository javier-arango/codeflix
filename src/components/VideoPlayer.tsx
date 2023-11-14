'use client'

import styles from '@styles/VideoPlayer.module.scss'
import type { YouTubeProps } from 'react-youtube'
import YouTube from 'react-youtube'

export const VideoPlayer = ({
  id,
  videoId,
  className,
  style,
  title,
  opts,
  loading,
  onReady,
  onError,
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

  return (
    <>
      <div className={styles.videoWrapper}>
        <YouTube
          id={id}
          videoId={videoId}
          className={styles.videoPlayer + ' ' + className}
          style={style}
          title={title}
          opts={defaultOpts || opts}
          loading={loading}
          onReady={onReady}
          onError={onError}
        />
      </div>
    </>
  )
}

// Display name
VideoPlayer.displayName = 'VideoPlayer'
