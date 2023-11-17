import type { CategoryInfo } from '@constants/videoCategories.constants'
import Link from 'next/link'
import styles from '../styles/Category.module.scss'

type categoryProps = {
  applyMargin: boolean
  category: CategoryInfo
}

export default function Category(props: categoryProps) {
  const testImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnID8fQxxIdC5Dm9H8Hju2OFOe9ZB54iZemQ&usqp=CAU'

  console.log(props.category)

  return (
    <Link href={`/categories/${props.category.key || ''}`}>
      <div
        className={`${styles.category} ${props.applyMargin && styles.margin}`}
        style={{ backgroundImage: `url(${testImage})` }}
      >
        <div className={styles.overlay}>
          <h2 className={styles.text}>{props.category.name}</h2>
        </div>
      </div>
    </Link>
  )
}
