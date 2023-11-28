import { WarningMessage } from '@components/foundation'
import { PlaylistItem } from '@components/foundation/playlist'
import { GetPlaylistVideos } from '@services/API'

export default async function PlaylistPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  // Fetch playlist videos
  const playlistVideos = await GetPlaylistVideos(id)

  return (
    <div className="px-0 py-4 lg:p-8 md:p-4">
      <h1>Playlist: {id}</h1>

      {playlistVideos.count > 0 ? (
        <div className="w-full">
          {playlistVideos.videos.map((video, index) => (
            <PlaylistItem
              key={video.videoId}
              playlistId={id}
              video={video}
              itemIndex={(index += 1)}
            />
          ))}
        </div>
      ) : (
        <WarningMessage
          title="This playlist is empty."
          subtitle="Please add videos to it."
        />
      )}
    </div>
  )
}

// Display name
PlaylistPage.displayName = 'PlaylistPage'
