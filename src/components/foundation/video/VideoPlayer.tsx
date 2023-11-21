'use client'

import { useState } from 'react'
import type { YouTubeProps } from 'react-youtube'
import YouTube from 'react-youtube'
import { Thumbnail } from '../Thumbnail'

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
      <div className="text-center text-red-600">
        Video cannot be played at the moment.
      </div>
    )
  }

  return (
    <>
      {!isPlayerReady && (
        <Thumbnail
          src={thumbnailUrl}
          alt="Video Thumbnail Image"
          style={{ opacity: isPlayerReady ? 0 : 1 }}
          priority
        />
      )}

      <div className="relative w-full aspect-video padding-top-16x9">
        <YouTube
          id={id}
          videoId={videoId}
          className={`absolute inset-0 w-full h-full ${className || ''}`}
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
