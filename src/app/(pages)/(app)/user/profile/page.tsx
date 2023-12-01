import {
  PlaylistPreviewSkeleton,
  ProfileContent,
  UserProfile,
  WarningMessage,
} from '@components/foundation'
import { PlaylistPreviewList } from '@components/foundation/playlist'
import { getUserDetails } from '@services/API'
import { getUserPlaylists } from '@services/API/getUserPlaylists.services'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import type { PlaylistListResponse, UserDetails } from 'types'

async function UserPlaylists({ userEmail }: { userEmail: string }) {
  // Get user playlists
  const userPlaylists: PlaylistListResponse = await getUserPlaylists(userEmail)

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
        <>
          <PlaylistPreviewList userPlaylists={userPlaylists.playlists} />
        </>
      )}
    </>
  )
}

export default async function ProfilePage() {
  // User session
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <WarningMessage
        title="You are not logged in."
        subtitle="Please log in to edit your profile"
      />
    )
  }

  // Fetch user data
  let user: UserDetails | null = null
  if (session.user && session.user.email) {
    user = await getUserDetails(session.user.email)
  }

  return (
    <div className="px-2 py-4 lg:p-8 md:p-4">
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
        // There was an error fetching user from db
        <WarningMessage title="An error occurred" subtitle="Please try again" />
      )}
    </div>
  )
}

// Display name
ProfilePage.displayName = 'ProfilePage'
