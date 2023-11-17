import Categories from '@components/Categories'
import NavBar from '@components/NavBar'
import Title from '@components/Title'
import { type CategoryInfo, type CategoryKey, VIDEO_CATEGORIES2 } from '@constants/videoCategories.constants';

export default function CategoriesPage() {

  const getCategories = function (
  ): CategoryInfo[] {
    const categories = [];

    for (const key in VIDEO_CATEGORIES2) {
      if (VIDEO_CATEGORIES2.hasOwnProperty(key)) {
        const categoryKey: CategoryKey = key as CategoryKey
        const categoryInfo: CategoryInfo = VIDEO_CATEGORIES2[categoryKey]
        categories.push(categoryInfo)
      }
    }

    return categories
  }

  return (
    <>
      <NavBar />
      <Title title={'Browse by Categories'} />
      <Categories allCategories={true} categories={getCategories()} />
    </>
  )
}
