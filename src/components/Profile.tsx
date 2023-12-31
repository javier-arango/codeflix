import styles from '@styles/Profile.module.scss'
import {
  getPlaylists,
  getUser,
  getVideosOfPlaylists,
} from '@utils/fetcher.utils'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import type { UserDetails, VideosResponse } from 'types'
import defaultProfileImage from '../../public/assets/defaultProfile.jpg'
import editProfile from '../../public/assets/edit_profile.svg'
import Tab from './Tab'
import Tabs from './Tabs'
import VideoList from './VideoList'
import { getPlaylistId } from '@utils/helper.utils'

export default async function Profile() {
  const session = await getServerSession(authOptions)
  let user: UserDetails | null = null
  let playlistRes

  if (session && session.user && session.user.email) {
    user = await getUser(session.user.email)

    if (user) playlistRes = await getPlaylists(user.email)
  }

  let watchlistVideos: VideosResponse
  let favoriteVideos: VideosResponse

  if (playlistRes) {
    // Get videos of playlists
    watchlistVideos = await getVideosOfPlaylists(
      getPlaylistId(playlistRes.playlists, 'Watch List')
    )
    favoriteVideos = await getVideosOfPlaylists(
      getPlaylistId(playlistRes.playlists, 'Favorites')
    )
  } else return null

  if (!user) return null

  return (
    <>
      <section id={styles.profile}>
        <div id={styles.container} className="container">
          <div id={styles.picAndName}>
            <div
              id={styles.pic}
              style={{
                backgroundImage: `url(${
                  user.avatar || defaultProfileImage.src
                })`,
              }}
            ></div>
            <h1 id={styles.name}>
              {user.firstName} {user.lastName}
            </h1>
          </div>
          <div id={styles.bio}>
            {user.bio ? user.bio : "No Bio ('edit your profile to add a bio)"}
          </div>
          <div id={styles.actions}>
            <Link href={'/profile/edit/'}>
              <button id={styles.edit}>
                <Image
                  id={styles.editIcon}
                  src={editProfile}
                  alt="edit profile"
                />{' '}
                Edit profile
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Tabs labels={['Watchlist', 'Favorites']}>
        <Tab
          content={
            <VideoList
              categoryTitle="Watchlist"
              videos={watchlistVideos}
              playlistId={getPlaylistId(playlistRes.playlists, 'Watch List')}
              playlist
              allVideos
            />
          }
        />
        <Tab
          content={
            <VideoList
              categoryTitle="Favorites"
              videos={favoriteVideos}
              playlistId={getPlaylistId(playlistRes.playlists, 'Favorites')}
              playlist
              allVideos
            />
          }
        />
      </Tabs>
    </>
  )
}
