import NavBar from '@components/NavBar'
import { VideoDetails } from '@components/VideoDetails'

export default function VideoPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div>
      <NavBar />
      <VideoDetails videoId={id} />
    </div>
  )
}

// Display name
VideoPage.displayName = 'VideoPage'
