import { VideoDetails } from '@components/videoDetails/VideoDetails'

export default function VideoPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div>
      <VideoDetails videoId={id} />
    </div>
  )
}

// Display name
VideoPage.displayName = 'VideoPage'
