import Banner from '@components/Banner'
import Categories from '@components/Categories'
import NavBar from '@components/NavBar'
// import VideoList from '@components/VideoList'
import {
  type Category2,
  type CategoryInfo,
  type CategoryKey,
  VIDEO_CATEGORIES2,
} from '@constants/videoCategories.constants'

export default function HomePage() {

  const getRandomCategories = function (
    categories: Category2,
    count: number
  ): CategoryInfo[] {
    const categoryKeys = Object.keys(categories) as CategoryKey[]
    const randomCategories: CategoryInfo[] = []

    for (let i = 0; i <= count; i++) {
      const randomIndex = Math.floor(Math.random() * categoryKeys.length)
      const randomKey = categoryKeys[randomIndex]
      randomCategories.push(categories[randomKey])
    }

    return randomCategories
  }

  return (
    <main>
      <NavBar />
      <Banner />
      <Categories allCategories={false} categories={getRandomCategories(VIDEO_CATEGORIES2, 4)}/>
      {/* <VideoList categoryTitle={"Test"} allVideos={true}/> */}
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'
