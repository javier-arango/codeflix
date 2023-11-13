import { StaticImageData } from 'next/image'
import styles from '../styles/Category.module.scss'

type categoryProps = {
  applyMargin: boolean
  image: StaticImageData
}

export default function Category(props: categoryProps) {
  const testImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnID8fQxxIdC5Dm9H8Hju2OFOe9ZB54iZemQ&usqp=CAU'

  return (
    <div
      className={`${styles.category} ${props.applyMargin && styles.margin}`}
      style={{ backgroundImage: `url(${testImage})` }}
    >
      <div className={styles.overlay}>
        <h2 className={styles.text}>Data Structures & Algorithms</h2>
      </div>
    </div>
  )
}
