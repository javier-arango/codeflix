'use client'

import useOptimistic from 'hooks/useOptimistic.hooks'
import type { PlaylistDetails } from 'types'
import { WarningMessage } from '../WarningMessage'
import { PlaylistPreview } from './PlaylistPreview'

interface PlaylistPreviewListProps {
  userPlaylists: PlaylistDetails[]
}

export const PlaylistPreviewList = ({
  userPlaylists,
}: PlaylistPreviewListProps) => {
  const [playlists, setOptimisticPlaylists, rollbackPlaylists] =
    useOptimistic<PlaylistDetails[]>(userPlaylists)

  const handlePlaylistRemove = (playlistId: string) => {
    setOptimisticPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.id !== playlistId)
    )
  }

  return (
    <>
      {userPlaylists.length === 0 ? (
        <WarningMessage
          title="No Playlists were Found"
          subtitle="Please create a playlist to view it here"
        />
      ) : (
        <div className="flex flex-row flex-wrap gap-6 md:gap-4 lg:gap-4">
          {playlists.map((playlist: PlaylistDetails) => (
            <PlaylistPreview
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
              description={playlist.description}
              thumbnail={playlist.thumbnail}
              videoCount={playlist.videoCount}
              onRemovePlaylist={handlePlaylistRemove}
              rollback={rollbackPlaylists}
            />
          ))}
        </div>
      )}
    </>
  )
}

// Display name
PlaylistPreviewList.displayName = 'PlaylistPreviewList'
