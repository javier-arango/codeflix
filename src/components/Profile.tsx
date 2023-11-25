import styles from '@styles/Profile.module.scss'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import type { CategoryKey, VideosResponse } from 'types'
import defaultProfileImage from '../../public/assets/defaultProfile.jpg'
import editProfile from '../../public/assets/edit_profile.svg'
import Tab from './Tab'
import Tabs from './Tabs'
import VideoList from './VideoList'

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

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  const data: VideosResponse | null = await getVideos('ai')

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
                  user?.image || defaultProfileImage.src
                })`,
              }}
            ></div>
            <h1 id={styles.name}>{user?.name}</h1>
          </div>
          <div id={styles.actions}>
            <button id={styles.edit}>
              <Image
                id={styles.editIcon}
                src={editProfile}
                alt="edit profile"
              />{' '}
              Edit profile
            </button>
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
