import styles from '@styles/Profile.module.scss'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import type { CategoryKey, UserDetails, VideosResponse } from 'types'
import defaultProfileImage from '../../public/assets/defaultProfile.jpg'
import editProfile from '../../public/assets/edit_profile.svg'
import Tab from './Tab'
import Tabs from './Tabs'
import VideoList from './VideoList'
import Link from 'next/link'

async function getVideos(category: CategoryKey) {
  const response = await fetch(
    `http://localhost:3000/api/videos?category=${category}`
  )

  console.log(response)

  if (!response || !response.ok) {
    return null
  }

  const data: VideosResponse = await response.json()

  return data
}

async function getPlaylists(userEmail: string | undefined | null) {
  try {
    const res = await fetch('http://localhost:3000/api/user/playlist/get_all', {
      method: 'POST',
      body: JSON.stringify({ userEmail }),
    })

    if (!res.ok) {
      return {
        count: 0,
        playlists: [],
      }
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      playlists: [],
    }
  }
}

async function getVideosOfPlaylists(playlistId: number) {
  const response = await fetch(
    `http://localhost:3000/api/user/playlist/${playlistId}`
  )

  if (!response || !response.ok) {
    return null
  }

  return await response.json()
}

async function getUser(email: string | undefined | null) {
  try {
    const res = await fetch('http://localhost:3000/api/user/get_user', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      return {
        error: true,
        message: "Error getting user info"
      }
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return {
      error: true,
      message: 'Error getting user info',
    }
  }
}

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user : UserDetails = await getUser(session?.user?.email)
  const data: VideosResponse | null = await getVideos('ai')
  // const playlistRes = await getPlaylists("test@test.com")

  // console.log(playlistRes)
  // if(playlistRes) {
  //   console.log("Getting videos of Playlists")
  //   // Get videos of playlists
  //   const watchlistVideos = await getVideosOfPlaylists(playlistRes.playlists[0].id)
  //   const favoriteVideos = await getVideosOfPlaylists(playlistRes.playlists[1].id)

  //   // print results
  //   console.log(watchlistVideos)
  //   console.log(favoriteVideos)

  // }

  if (!data) {
    return null
  }

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
            <h1 id={styles.name}>{user.firstName} {user.lastName}</h1>
          </div>
          <div id={styles.bio}>{user.bio ? user.bio : "No Bio ('edit your profile to add a bio)"}</div>
          <div id={styles.actions}>
            <Link href={'/profile/edit'} >
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
            <VideoList categoryTitle="" videos={data} playlist allVideos />
          }
        />
        <Tab
          content={
            <VideoList categoryTitle="" videos={data} playlist allVideos />
          }
        />
      </Tabs>
    </>
  )
}
