import type { CategoryKey, VideosResponse } from 'types'

export const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => {
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.')
    }
    return res.json()
  })

export async function getVideos(category: CategoryKey) {
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
