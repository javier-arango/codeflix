import Link from 'next/link'
import styles from '../styles/Categories.module.scss'
import Category from './Category'

// Testing
import categoryImage from '../../public/assets/database.png'

type CategoriesProps = {
  allCategories: boolean
}

export default function Categories(props: CategoriesProps) {
  // it is all categories get all categories from database
  // if not get only 4 from database
  const quantity = props.allCategories ? 20 : 4

  const getCategories = (num: number) => {
    const array = []

    for (var i = 1; i <= num; i++) {
      array.push(
        <Category
          key={i}
          applyMargin={num == 4 ? false : true}
          image={categoryImage}
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
                <h2>View all</h2>
              </Link>
            </div>
          )}
          <div
            className={
              props.allCategories ? styles.allCategories : styles.someCategories
            }
          >
            {getCategories(quantity)}
          </div>
        </div>
      </div>
    </section>
  )
}
