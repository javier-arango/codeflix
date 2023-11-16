import Banner from '@components/Banner'
import Categories from '@components/Categories'
import NavBar from '@components/NavBar'
// import VideoList from '@components/VideoList'
import { Category2, CategoryInfo, CategoryKey, VIDEO_CATEGORIES2 } from '@constants/videoCategories.constants'
import Link from 'next/link'

export default function HomePage() {

  const getRandomCategories = function (
    categories: Category2,
    count: number
  ): CategoryInfo[] {
    const categoryKeys = Object.keys(categories) as CategoryKey[]
    let randomCategories: CategoryInfo[] = []

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * categoryKeys.length)
      const randomKey = categoryKeys[randomIndex]
      randomCategories.push(categories[randomKey])
    }

    return randomCategories
  }

  // console.log(getRandomCategories(VIDEO_CATEGORIES2, 4))

  return (
    <main>
      <NavBar />
      <Banner />
      <Categories allCategories={false} categories={getRandomCategories(VIDEO_CATEGORIES2, 4)}/>
      <Link href="/video/8mAITcNt710" style={{ color: 'black' }}>
        Click here to watch a video about CS
      </Link>
      {/* <VideoList categoryTitle={"Test"} allVideos={true}/> */}
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'
