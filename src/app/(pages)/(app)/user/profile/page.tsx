import {
  PlaylistPreviewSkeleton,
  ProfileContent,
  UserProfile,
  WarningMessage,
} from '@components/foundation'
import {
  PlaylistPreview,
  type PlaylistPreviewProps,
} from '@components/foundation/playlist'
import { getUserDetails } from '@services/API'
import { GetUserPlaylists } from '@services/API/getUserPlaylists.services'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import type { PlaylistListResponse, UserDetails } from 'types'

async function UserPlaylists({ userEmail }: { userEmail: string }) {
  // Get user playlists
  const userPlaylists: PlaylistListResponse = await GetUserPlaylists(userEmail)

  if (!userPlaylists) {
    return (
      <WarningMessage title="An error occurred" subtitle="Please try again" />
    )
  }

  return (
    <>
      {userPlaylists.count === 0 ? (
        <WarningMessage
          title="No Playlists were Found"
          subtitle="Please create a playlist to view it here"
        />
      ) : (
        <div className="flex flex-row flex-wrap gap-2 lg:gap-4">
          {userPlaylists.playlists.map((playlist: PlaylistPreviewProps) => (
            <PlaylistPreview
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
              thumbnail={playlist.thumbnail}
              description={playlist.description}
              videoCount={playlist.videoCount}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default async function ProfilePage() {
  // User session
  const session = await getServerSession(authOptions)

  // Fetch user data
  let user: UserDetails | null = null
  if (session && session.user && session.user.email) {
    user = await getUserDetails(session.user.email)
  }

  return (
    <div className="p-8">
      {user ? (
        <UserProfile user={user}>
          {/* User playlists */}
          <Suspense
            fallback={
              <div className="flex flex-row flex-wrap gap-2 lg:gap-4">
                {Array.from({ length: 2 }, (_, i) => (
                  <PlaylistPreviewSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ProfileContent
              playlists={<UserPlaylists userEmail={user.email} />}
            />
          </Suspense>
        </UserProfile>
      ) : (
        // User is not login yet send the user to login page
        <WarningMessage
          title="User not sign in"
          subtitle="Please sign in to view your profile"
        />
      )}
    </div>
  )
}

// Display name
ProfilePage.displayName = 'ProfilePage'
