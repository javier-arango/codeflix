import type { VideosResponse } from 'types'
import VideoList from './VideoList'

type Props = {
  query: string
  results: VideosResponse
}
export default function SearchResults({ query, results }: Props) {
  return (
    <section>
      <div className="container">
        <h1 style={{ marginTop: '20px' }}>Results for {decodeURI(query)}</h1>
        <VideoList allVideos={true} playlist={false} videos={results} />
      </div>
    </section>
  )
}
