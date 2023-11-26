import styles from '@styles/Profile.module.scss'
import { getPlaylists, getUser, getVideosOfPlaylists } from '@utils/fetcher.utils'
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

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user: UserDetails = await getUser(session?.user?.email)
  const playlistRes = await getPlaylists('test@test.com')
  let watchlistVideos: VideosResponse
  let favoriteVideos: VideosResponse

  if (playlistRes) {
    // Get videos of playlists
    watchlistVideos = await getVideosOfPlaylists(playlistRes.playlists[0].id)
    favoriteVideos = await getVideosOfPlaylists(playlistRes.playlists[1].id)
  } else return null

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
            <Link href={`/profile/edit/${user.id}?email=${user.email}`}>
              <button id={styles.edit} onClick={editProfile}>
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
      <Tabs labels={['Watchlist', 'Favorite']}>
        <Tab
          content={
            <VideoList
              categoryTitle=""
              videos={watchlistVideos}
              playlistId={playlistRes.playlists[0].id}
              playlist
              allVideos
            />
          }
        />
        <Tab
          content={
            <VideoList
              categoryTitle=""
              videos={favoriteVideos}
              playlistId={playlistRes.playlists[1].id}
              playlist
              allVideos
            />
          }
        />
      </Tabs>
    </>
  )
}
