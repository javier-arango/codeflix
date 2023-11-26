import Banner from '@components/Banner'
import Categories from '@components/Categories'
import VideoList from '@components/VideoList'
import {
  VIDEO_CATEGORIES2,
  type Category2,
} from '@constants/videoCategories.constants'
import { getVideos } from '@utils/fetcher.utils'
import type { CategoryInfo, CategoryKey, VideosResponse } from 'types'

const categoryKeys = Object.keys(VIDEO_CATEGORIES2) as CategoryKey[]

/**
 * Helper function that helps generate a safe random number
 * @param min
 * @param max
 * @returns the random number generated
 */
const getRandomNumber = function getRandomNumber(
  min: number,
  max: number
): number {
  // Use the crypto API to generate a secure random number
  const randomBuffer = new Uint32Array(1)
  crypto.getRandomValues(randomBuffer)
  let randomNumber = randomBuffer[0] / (0xffffffff + 1) // Normalize to [0, 1)

  // Scale and shift the range to [min, max)
  randomNumber = min + Math.floor(randomNumber * (max - min))

  return randomNumber
}

/**
 * Get a quantity of random categories
 * @param categories
 * @param count
 * @returns
 */
const getRandomCategories = function (
  categories: Category2,
  count: number
): CategoryInfo[] {
  const randomCategories: CategoryInfo[] = []

  for (let i = 0; i <= count; i++) {
    const randomIndex = getRandomNumber(0, categoryKeys.length)
    const randomKey = categoryKeys[randomIndex]
    randomCategories.push(categories[randomKey])
  }

  return randomCategories
}

export default async function HomePage() {
  const randomCategories = getRandomCategories(VIDEO_CATEGORIES2, 4)
  const data: VideosResponse | null = await getVideos(randomCategories[0].key)
  const data2: VideosResponse | null = await getVideos(randomCategories[1].key)

  return (
    <main>
      <Banner />
      <Categories allCategories={false} categories={randomCategories} />
      <VideoList
        categoryTitle={randomCategories[0].name}
        allVideos={false}
        videos={data}
        playlist={false}
        categoryKey={randomCategories[0].key}
      />
      <VideoList
        categoryTitle={randomCategories[1].name}
        allVideos={false}
        videos={data2}
        playlist={false}
        categoryKey={randomCategories[1].key}
      />
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'
