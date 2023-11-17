import NavBar from '@components/NavBar'
import Title from '@components/Title'
import VideoList from '@components/VideoList'
import { type CategoryKey, VIDEO_CATEGORIES } from '@constants/videoCategories.constants'

export interface CategoryResponse {
  count: number
  videos: CategoryResponse
}

async function getVideos (category: CategoryKey) {
  const response = await fetch(
    `http://localhost:3000/api/videos?category=${category}`
  )

  console.log(response)

  if (!response || !response.ok) {
    return null
  }

  const data: CategoryResponse = await response.json()

  return data
}

export default async function CategoryPage ({ params }: { params: { category: CategoryKey } }) {
  const { category } = params
  const data : CategoryResponse | null = await getVideos(category)

  if(!data) {
    return null
  }

  return (
    <>
      <NavBar />
      <Title title={VIDEO_CATEGORIES[category]} />
      <VideoList allVideos={true} categoryTitle={''} videos={data}/>
    </>
  )
}
