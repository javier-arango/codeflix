import SearchResults from '@components/SearchResults'
import { searchVideos } from '@utils/fetcher.utils'
import type { VideosResponse } from 'types'

export default async function ResultsPage({
  params,
}: {
  params: { searchQuery: string }
}) {
  const { searchQuery } = params
  const data: VideosResponse = await searchVideos(decodeURI(searchQuery))

  if (!data) {
    return null
  }

  return <SearchResults query={searchQuery} results={data} />
}

// Display name
ResultsPage.displayName = 'Results Page'
