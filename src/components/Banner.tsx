import Image from 'next/image'
import styles from '../styles/Banner.module.scss'
import bannerImage from '../../public/assets/learning.svg'

export default function Banner() {
  return (
    <section id={styles.banner}>
      <div id={styles.container} className="container">
        <div id={styles.imgCont}>
          <Image
            id={styles.image}
            src={bannerImage}
            alt="Learning picture"
          />
        </div>
        <div id={styles.msgCont}>
          <h1 id={styles.title}>Level up your skills</h1>
          <p id={styles.message}>
            Get the knowledge, experience, and confidence you need to <br />
            make you get better in your computer science career.
          </p>
        </div>
      </div>
    </section>
  )
}
