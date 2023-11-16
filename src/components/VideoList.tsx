import Link from 'next/link'
import styles from '../styles/VideoList.module.scss'

type VideosProps = {
  allVideos: boolean
}

export default function VideoList(props: VideosProps) {
  return (
    <section id={styles.videosSection}>
      <div className="container">
        <div className="main">
          {!props.allVideos && (
            <div id={styles.header}>
              <h1 id={styles.categoryTitle}>Browse Categories</h1>
              <Link href={''}>
                <h2>View all</h2>
              </Link>
            </div>
          )}
          <div
            className={
              props.allVideos ? styles.allVideos : styles.someVideos
            }
          ></div>
        </div>
      </div>
    </section>
  )
}
