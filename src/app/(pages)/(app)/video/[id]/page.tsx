import NavBar from '@components/NavBar'
import VideoView from '@components/VideoView'

export default function VideoPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div>
      <NavBar />
      <VideoView videoId={id} />
    </div>
  )
}

// Display name
VideoPage.displayName = 'VideoPage'
