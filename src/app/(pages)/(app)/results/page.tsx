import { VideoPreview } from '@components/foundation'
import { parseVideoPreviewData } from '@utils/index'
import { AiFillWarning } from 'react-icons/ai'
import type { SearchResponse } from 'types'

// Fetch videos from search query
async function searchVideos(query?: string): Promise<SearchResponse> {
  try {
    const res = await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    })

    if (!res.ok) {
      return {
        count: 0,
        result: [],
      }
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      result: [],
    }
  }
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: { search_query?: string }
}) {
  // Get search query from URL
  const query = searchParams.search_query

  // Get videos from search query
  const searchResponse: SearchResponse = await searchVideos(query)

  // If no videos, return no videos message
  if (searchResponse.count === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <AiFillWarning className="text-6xl text-default-500" />
        <h1 className="text-2xl font-bold">No videos found</h1>
        <p className="text-default-500 text-sm">
          Try searching for something else
        </p>
      </div>
    )
  }

  return (
    <div className="lg:p-8 md:p-5 p-0 pb-9">
      <h1 className="text-lg font-bold py-4 text-center md:text-left">
        {`${searchResponse.count} results for ${query}`}
      </h1>

      <div className="flex flex-col lg:gap-4 gap-8">
        {searchResponse.result.map((video) => (
          <VideoPreview
            key={video.videoId}
            video={parseVideoPreviewData(video)}
          />
        ))}
      </div>
    </div>
  )
}

// Display name
ResultsPage.displayName = 'ResultsPage'
