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
    return <div>No Videos</div>
  }

  return (
    <div>
      <h1>Results Page</h1>
      <p>
        Query: {query} and Video Count: {searchResponse.count}
      </p>
    </div>
  )
}

// Display name
ResultsPage.displayName = 'ResultsPage'
