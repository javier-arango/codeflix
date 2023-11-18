import styles from '../styles/Title.module.scss'

type title = {
  title: string
}

export default function Title(props: title) {
  const title = props.title

  return (
    <section id={styles.titleSection}>
      <div id={styles.container} className="container">
        <h1 id={styles.title}>{title}</h1>
      </div>
    </section>
  )
}
