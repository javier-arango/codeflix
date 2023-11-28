import { WarningMessage } from '@components/foundation'
import { PlaylistList } from '@components/foundation/playlist'
import { ScrollShadow, Spinner } from '@nextui-org/react'
import { GetPlaylistVideos, getPlaylistDetails } from '@services/API'
import { Suspense } from 'react'

async function PlaylistVideos({ id }: { id: string }) {
  const playlistVideos = await GetPlaylistVideos(id)

  if (!playlistVideos) {
    return (
      <WarningMessage
        title="Failed to load playlist videos"
        subtitle="Please try again later."
      />
    )
  }

  return <PlaylistList playlistId={id} playlistVideos={playlistVideos} />
}

export default async function PlaylistPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  // Fetch playlist details
  const playlist = await getPlaylistDetails(id)

  if (!playlist) {
    return (
      <WarningMessage
        title="Playlist not found"
        subtitle="The playlist you are looking for does not exist."
      />
    )
  }

  return (
    <div className="px-0 py-4 lg:p-8 md:p-4">
      <div className="flex flex-col items-center gap-2 pb-8">
        <h1 className="text-5xl">{playlist.name}</h1>
        {playlist.description && (
          <p className="text-base">{playlist.description}</p>
        )}
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center align-center w-screen h-screen">
            <Spinner size="lg" />
          </div>
        }
      >
        <ScrollShadow hideScrollBar className="h-screen">
          <PlaylistVideos id={id} />
        </ScrollShadow>
      </Suspense>
    </div>
  )
}

// Display name
PlaylistPage.displayName = 'PlaylistPage'
