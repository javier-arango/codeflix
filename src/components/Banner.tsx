import styles from '../styles/Banner.module.scss';

export default function Banner() {
  return (
    <section id={styles.banner}>
      <div id={styles.container} className="container">
        <div id={styles.imgCont}>
          <img id={styles.image} src="learning.svg" alt="My Happy SVG" />
        </div>
        <div id={styles.msgCont}>
          <h1 id={styles.title}>Level up your skills</h1>
          <p>
            Get the knowledge, experience, and confidence you need to <br />
            make you get better in your computer science career.
          </p>
        </div>
      </div>
    </section>
  )
}
