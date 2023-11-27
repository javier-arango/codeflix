'use client'

import type { Video } from '@prisma/client'
import styles from '@styles/VideoView.module.scss'
import {
  addVideoToPlaylist,
  getPlaylists,
  getVideosOfPlaylists,
  removeVideoFromPlaylist,
} from '@utils/fetcher.utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import type { VideosResponse } from 'types'
import bookmark from '../../public/assets/bookmark.svg'
import removeBookmark from '../../public/assets/bookmark_minus.svg'
import star from '../../public/assets/star.svg'
import starFill from '../../public/assets/star_fill.svg'

type Props = {
  videoId: string
}

export default function VideoActions(props: Props) {
  const { status } = useSession()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)
  // const [favId, setFavID] = useState(0)
  // const [bookId, setBookID] = useState(0)

  const check = async () => {
    const playlistRes = await getPlaylists('test@test.com')
    // Get videos of Watchlist and Favorite
    const watchlistVideosRes: VideosResponse = await getVideosOfPlaylists(
      playlistRes.playlists[0].id
    )
    const favoriteVideosRes: VideosResponse = await getVideosOfPlaylists(
      playlistRes.playlists[1].id
    )
    const watchlistVideos: Video[] = watchlistVideosRes?.videos ?? []
    const favoriteVideos: Video[] = favoriteVideosRes?.videos ?? []

    if (watchlistVideos && favoriteVideos) {
      const bookmarkState = watchlistVideos.some((video) => {
        return video.videoId === props.videoId
      })
      const favoriteState = favoriteVideos.some((video) => {
        return video.videoId === props.videoId
      })

      return { bookmarkState, favoriteState }
    }

    // If the previous condition is not met, return some default values or handle the case accordingly
    return { bookmarkState: false, favoriteState: false }
  }

  useEffect(() => {
    async function fetchData() {
      const { bookmarkState, favoriteState } = await check()
      setIsBookmark(bookmarkState)
      setIsFavorite(favoriteState)
    }

    fetchData()
  })

  const handleActionsClick = async (action: string) => {
    // First check if the user has a session
    if (status != 'authenticated') {
      // Show message for user to login
      toast.error('Login to perform this action')
    } else {
      // User has a session, add or remove video to corresponding playlist
      if(action === 'favorite') {
        if (isFavorite) {
          await removeVideoFromPlaylist(props.videoId, '0').then((res) => {
            if(res.error) {
              toast.error(res.error)
            } else {
              toast.success(res.message)
              setIsFavorite((prevIsFavorite) => !prevIsFavorite)
            }
          })
        } else {
          await addVideoToPlaylist(props.videoId, '0').then((res) => {
            if (res.error) {
              toast.error(res.error)
            } else {
              toast.success(res.message)
              setIsFavorite((prevIsFavorite) => !prevIsFavorite)
            }
          })
        }
      } else if (action === 'bookmark') {
        if (isBookmark) {
          await removeVideoFromPlaylist(props.videoId, '1').then((res) => {
            if (res.error) {
              toast.error(res.error)
            } else {
              toast.success(res.message)
              setIsBookmark((prevIsBookmark) => !prevIsBookmark)
            }
          })
        } else {
          await addVideoToPlaylist(props.videoId, '1').then((res) => {
            if (res.error) {
              toast.error(res.error)
            } else {
              toast.success(res.message)
              setIsBookmark((prevIsBookmark) => !prevIsBookmark)
            }
          })
        }
      }
    }
  }

  return (
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
  )
}
