import { SelectList, VideoList } from '@components/foundation'
import { VIDEO_CATEGORIES, type CategoryKey } from '@constants/index'
import { getVideosByCategory } from '@services/getVideosByCategory.services'
import { AiFillWarning } from 'react-icons/ai'
import type { VideoListResponse } from 'types'

export default async function HomePage() {
  const categoryValues: CategoryKey[] = Object.keys(
    VIDEO_CATEGORIES
  ) as CategoryKey[]

  // Fetch videos for the given category
  const videoList: VideoListResponse = await getVideosByCategory('ai')

  if (!videoList) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <AiFillWarning className="text-6xl text-default-500" />
        <h1 className="text-2xl font-bold">Videos not found</h1>
        <p className="text-default-500 text-sm">
          An error occurred while trying to fetch the videos
        </p>
      </div>
    )
  }

  return (
    <main className="px-0 py-4 lg:p-8 md:p-4">
      <div className="py-4">
        <SelectList categories={categoryValues} />
      </div>

      <VideoList videos={videoList.videos} />
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'
