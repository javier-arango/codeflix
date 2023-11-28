import Link from 'next/link'
import styles from '../styles/Categories.module.scss'
import Category from './Category'
import type { CategoryInfo } from 'types'

type CategoriesProps = {
  allCategories: boolean
  categories: CategoryInfo[]
}

export default function Categories(props: CategoriesProps) {
  const getCategories = (categories: CategoryInfo[]) => {
    const array = []

    for (let i = 1; i < categories.length; i++) {
      array.push(
        <Category
          key={i}
          applyMargin={categories.length == 4 ? false : true}
          category={categories[i]}
        />
      )
    }

    return array
  }

  return (
    <section id={styles.categorySection}>
      <div className="container">
        <div className="main-cat">
          {!props.allCategories && (
            <div id={styles.header}>
              <h1 id={styles.browseText}>Browse Categories</h1>
              <Link href={'/categories'}>
                <h2 id={styles.viewAll}>View all</h2>
              </Link>
            </div>
          )}
          <div
            className={
              props.allCategories ? styles.allCategories : styles.someCategories
            }
          >
            {getCategories(props.categories)}
          </div>
        </div>
      </div>
    </section>
  )
}
