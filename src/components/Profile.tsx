import styles from '@styles/Profile.module.scss'
import Tabs from './Tabs'
import Tab from './Tab'
import VideoList from './VideoList'
import type { CategoryKey, VideosResponse } from 'types'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import defaultProfileImage from '../../public/assets/defaultProfile.jpg'

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
    <section id={styles.profile}>
      <div id={styles.container} className="container">
        <div id={styles.picAndName}>
          <div
            id={styles.pic}
            style={{ backgroundImage: `url(${defaultProfileImage.src})` }}
          ></div>
          <h1 id={styles.name}>{user?.name}</h1>
        </div>
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
      </div>
    </section>
  )
}
