'use client'

import type { Playlist, Video } from '@prisma/client'
import styles from '@styles/VideoView.module.scss'
import {
  addVideoToPlaylist,
  getPlaylists,
  getVideosOfPlaylists,
  removeVideoFromPlaylist,
} from '@utils/fetcher.utils'
import { getPlaylistId } from '@utils/helper.utils'
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
  const { data, status } = useSession()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)
  const [playlists, setPlaylsits] = useState([] as Playlist[])

  useEffect(() => {
    const check = async () => {
      // Get the user Playlists
      const playlistRes = await getPlaylists(data?.user?.email)

      // Get videos of Watchlist and Favorite
      const watchlistVideosRes: VideosResponse = await getVideosOfPlaylists(
        getPlaylistId(playlistRes.playlists, 'Watch List')
      )
      const favoriteVideosRes: VideosResponse = await getVideosOfPlaylists(
        getPlaylistId(playlistRes.playlists, 'Favorites')
      )

      // Get the videos array of each playlist
      const watchlistVideos: Video[] = watchlistVideosRes?.videos ?? []
      const favoriteVideos: Video[] = favoriteVideosRes?.videos ?? []

      // Check if current video is in each playlist
      if (watchlistVideos && favoriteVideos) {
        const bookmarkState = watchlistVideos.some((video) => {
          return video.videoId === props.videoId
        })
        const favoriteState = favoriteVideos.some((video) => {
          return video.videoId === props.videoId
        })

        return { bookmarkState, favoriteState, playlistRes }
      }

      // If the previous condition is not met, return some default values or handle the case accordingly
      return { bookmarkState: false, favoriteState: false }
    }
    async function fetchData() {
      console.log('Fetching for bookmark or favorite state')
      const { bookmarkState, favoriteState, playlistRes } = await check()
      console.log(
        'book: ' +
          bookmarkState +
          ', fav: ' +
          favoriteState +
          ', playlist: ' +
          playlistRes
      )
      setIsBookmark(bookmarkState)
      setIsFavorite(favoriteState)
      setPlaylsits(playlistRes.playlists)
    }

    fetchData()
  }, [data?.user?.email, props.videoId])

  const handleActionsClick = async (action: string) => {
    // First check if the user has a session
    if (status != 'authenticated') {
      // Show message for user to login
      toast.error('Login to perform this action')
    } else {
      // User has a session, add or remove video to corresponding playlist
      if (action === 'favorite') {
        // Get the playlist id
        const favoritesPlaylistId = getPlaylistId(playlists, 'Favorites')

        // add or remove from playlist based on state
        if (isFavorite) {
          await removeVideoFromPlaylist(
            props.videoId,
            favoritesPlaylistId
          ).then((res) => {
            if (res.error) {
              toast.error(res.error)
            } else {
              toast.success(res.message)
              setIsFavorite((prevIsFavorite) => !prevIsFavorite)
            }
          })
        } else {
          await addVideoToPlaylist(props.videoId, favoritesPlaylistId).then(
            (res) => {
              if (res.error) {
                toast.error(res.error)
              } else {
                toast.success(res.message)
                setIsFavorite((prevIsFavorite) => !prevIsFavorite)
              }
            }
          )
        }
      } else if (action === 'bookmark') {
        // Get the playlist id
        const bookmarkPlaylistId = getPlaylistId(playlists, 'Watch List')

        // add or remove from playlist based on state
        if (isBookmark) {
          await removeVideoFromPlaylist(props.videoId, bookmarkPlaylistId).then(
            (res) => {
              if (res.error) {
                toast.error(res.error)
              } else {
                toast.success(res.message)
                setIsBookmark((prevIsBookmark) => !prevIsBookmark)
              }
            }
          )
        } else {
          await addVideoToPlaylist(props.videoId, bookmarkPlaylistId).then(
            (res) => {
              if (res.error) {
                toast.error(res.error)
              } else {
                toast.success(res.message)
                setIsBookmark((prevIsBookmark) => !prevIsBookmark)
              }
            }
          )
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
