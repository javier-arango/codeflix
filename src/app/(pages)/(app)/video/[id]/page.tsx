import VideoView from '@components/VideoView'

export default function VideoPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div>
      <VideoView videoId={id} />
    </div>
  )
}

// Display name
VideoPage.displayName = 'VideoPage'
