import styles from '@styles/Profile.module.scss'
import Tabs from './Tabs'
import Tab from './Tab'

export default function Profile () {
  return (
    <section id={styles.profile}>
      <div id={styles.container} className="container">
        <div id={styles.picAndName}>
          <div id={styles.pic}></div>
          <h1 id={styles.name}>John Peter</h1>
        </div>
        <Tabs labels={["watchlist", "favorite"]}>
          <Tab label="Watchlist" content={<p>Content for Tab 1 goes here.</p>} />
          <Tab label="Favorite" content={<p>Content for Tab 2 goes here.</p>} />
        </Tabs>
      </div>
    </section>
  )
}