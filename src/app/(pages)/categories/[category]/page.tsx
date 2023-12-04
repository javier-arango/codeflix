import Title from '@components/Title'
import VideoList from '@components/VideoList'
import { VIDEO_CATEGORIES } from '@constants/videoCategories.constants'
import { getVideos } from '@utils/fetcher.utils'
import type { CategoryKey, VideosResponse } from 'types'

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

// Display name
CategoryPage.displayName = 'Category'
