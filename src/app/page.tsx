import {
  VideoListWithCategorySelect,
  WarningMessage,
} from '@components/foundation'
import { VIDEO_CATEGORIES, type CategoryKey } from '@constants/index'
import { getVideosByCategory } from '@services/API'
import type { VideoListResponse } from 'types'

export default async function HomePage() {
  const categoryValues: CategoryKey[] = Object.keys(
    VIDEO_CATEGORIES
  ) as CategoryKey[]

  // Fetch videos for the given category
  const videoList: VideoListResponse = await getVideosByCategory('all')

  if (!videoList) {
    return (
      <WarningMessage
        title="Videos not found"
        subtitle="An error occurred while trying to fetch the videos"
      />
    )
  }

  return (
    <main>
      {videoList.videos.length === 0 ? (
        <WarningMessage
          title="No videos found"
          subtitle="Please try to refresh the page"
        />
      ) : (
        <VideoListWithCategorySelect
          videos={videoList.videos}
          categories={categoryValues}
        />
      )}
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'
