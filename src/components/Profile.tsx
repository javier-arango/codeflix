import styles from '@styles/Profile.module.scss'
import Tabs from './Tabs'
import Tab from './Tab'
import VideoList from './VideoList'

export default function Profile () {
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
                videos={{ count: 0, videos: null }}
                allVideos
              />
            }
          />
          <Tab
            label="Favorite"
            content={
              <VideoList
                categoryTitle=""
                videos={{ count: 0, videos: null }}
                allVideos
              />
            }
          />
        </Tabs>
      </div>
    </section>
  )
}