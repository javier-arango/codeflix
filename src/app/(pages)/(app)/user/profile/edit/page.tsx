import { EditProfileForm } from '@components/EditProfileForm'
import { WarningMessage } from '@components/foundation'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { getUserDetails } from '@services/API'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import type { Session } from 'next-auth'
import { getServerSession } from 'next-auth'
import type { UserDetails } from 'types'

export default async function EditProfilePage() {
  // Get user session
  const session: Session | null = await getServerSession(authOptions)

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
      <div className="flex justify-center items-center">
        {user ? (
          <Card
            // fullWidth
            shadow="none"
            classNames={{
              base: 'bg-transparent w-full md:w-w-4/5 lg:w-1/2 ',
            }}
          >
            <CardHeader>
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold">
                Edit Profile
              </h1>
            </CardHeader>

            <CardBody>
              <EditProfileForm
                userEmail={user.email}
                firstName={user.firstName}
                lastName={user.lastName}
                bio={user.bio}
                avatar={user.avatar}
              />
            </CardBody>
          </Card>
        ) : (
          // There was an error fetching user from db
          <WarningMessage
            title="An error occurred"
            subtitle="Please try again"
          />
        )}
      </div>
    </div>
  )
}

// Display name
EditProfilePage.displayName = 'EditProfilePage'
