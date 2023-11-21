import styles from '@styles/Profile.module.scss'
import Tabs from './Tabs'
import Tab from './Tab'
import VideoList from './VideoList'
import { CategoryKey } from '@constants/videoCategories.constants'
import type { CategoryResponse } from 'types'

async function getVideos(category: CategoryKey) {
  const response = await fetch(
    `http://localhost:3000/api/videos?category=${category}`
  )

  console.log(response)

  if (!response || !response.ok) {
    return null
  }

  const data: CategoryResponse = await response.json()

  return data
}

export default async function Profile () {

  const data: CategoryResponse | null = await getVideos("ai")

  if (!data) {
    return null
  }
  
  return (
    <section id={styles.profile}>
      <div id={styles.container} className="container">
        <div id={styles.picAndName}>
          <div id={styles.pic}></div>
          <h1 id={styles.name}>John Peter</h1>
        </div>
        <Tabs labels={['Watchlist', 'Favorite']}>
          <Tab
            label="Watchlist"
            content={
              <VideoList
                categoryTitle=""
                videos={data}
                playlist
                allVideos
              />
            }
          />
          <Tab
            label="Favorite"
            content={
              <VideoList
                categoryTitle=""
                videos={data}
                playlist
                allVideos
              />
            }
          />
        </Tabs>
      </div>
    </section>
  )
}