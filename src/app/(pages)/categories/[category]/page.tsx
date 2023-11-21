import Title from '@components/Title'
import VideoList from '@components/VideoList'
import { VIDEO_CATEGORIES } from '@constants/videoCategories.constants'
import type { CategoryKey, VideosResponse } from 'types'

async function getVideos(category: CategoryKey) {
  const response = await fetch(
    `http://localhost:3000/api/videos?category=${category}`
  )

  console.log(response)

  if (!response || !response.ok) {
    return null
  }

  const data: VideosResponse = await response.json()

  return data
}

export default async function CategoryPage({
  params,
}: {
  params: { category: CategoryKey }
}) {
  const { category } = params
  const data: VideosResponse | null = await getVideos(category)

  if (!data) {
    return null
  }

  return (
    <>
      <Title title={VIDEO_CATEGORIES[category]} />
      <VideoList
        allVideos={true}
        categoryTitle={''}
        videos={data}
        playlist={false}
      />
    </>
  )
}
