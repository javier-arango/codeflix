
import type { CategoryInfo } from 'types'
import Link from 'next/link'
import styles from '../styles/Category.module.scss'

type categoryProps = {
  applyMargin: boolean
  category: CategoryInfo
}

export default function Category(props: categoryProps) {
  return (
    <Link href={`/categories/${props.category.key || ''}`}>
      <div
        className={`${styles.category} ${props.applyMargin && styles.margin}`}
        style={{ backgroundImage: `url(${props.category.img.src})` }}
      >
        <div className={styles.overlay}>
          <h2 className={styles.text}>{props.category.name}</h2>
        </div>
      </div>
    </Link>
  )
}
