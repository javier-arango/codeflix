import SearchResults from '@components/SearchResults'
import type { VideosResponse } from 'types'

// async function getResults(query: string) {
//   const response = await fetch('http://localhost:3000/api/search', {
//     method: 'POST',
//     body: JSON.stringify({ query: query }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
  
//   if (!response || !response.ok) {
//     return null
//   }

//   const data = await response.json()

//   console.log(data)

//   return data
// }

export async function searchVideos(query?: string): Promise<VideosResponse> {
  try {
    const res = await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    })

    if (!res.ok) {
      return {
        count: 0,
        videos: [],
      }
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      videos: [],
    }
  }
}

export default async function ResultsPage({ params }: { params: { searchQuery: string } }) {
  const { searchQuery } = params
  const data: VideosResponse = await searchVideos(decodeURI(searchQuery))

  if (!data) {
    return null
  }

  return (
    <>
      <SearchResults query={searchQuery} results={data}/>
    </>
  )
}
