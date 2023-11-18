import Banner from '@components/Banner'
import Categories from '@components/Categories'
import NavBar from '@components/NavBar'
// import VideoList from '@components/VideoList'
import {
  VIDEO_CATEGORIES2,
  type Category2,
  type CategoryInfo,
  type CategoryKey,
} from '@constants/videoCategories.constants'

export default function HomePage() {
  const getRandomNumber = function getRandomNumber(min: number, max: number): number {
    // Use the crypto API to generate a secure random number
    const randomBuffer = new Uint32Array(1)
    crypto.getRandomValues(randomBuffer)
    let randomNumber = randomBuffer[0] / (0xffffffff + 1) // Normalize to [0, 1)

    // Scale and shift the range to [min, max)
    randomNumber = min + Math.floor(randomNumber * (max - min))

    return randomNumber
  }

  const getRandomCategories = function (
    categories: Category2,
    count: number
  ): CategoryInfo[] {
    const categoryKeys = Object.keys(categories) as CategoryKey[]
    const randomCategories: CategoryInfo[] = []

    for (let i = 0; i <= count; i++) {
      const randomIndex = getRandomNumber(0, categoryKeys.length)
      const randomKey = categoryKeys[randomIndex]
      randomCategories.push(categories[randomKey])
    }

    return randomCategories
  }

  return (
    <main>
      <NavBar />
      <Banner />
      <Categories
        allCategories={false}
        categories={getRandomCategories(VIDEO_CATEGORIES2, 4)}
      />
      {/* <VideoList categoryTitle={"Test"} allVideos={true}/> */}
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'
