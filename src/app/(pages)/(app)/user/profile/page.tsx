import { ProfileContent } from '@components/foundation'
import { Avatar, Card, CardBody, CardHeader } from '@nextui-org/react'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export default async function ProfilePage() {
  // User session
  const session = await getServerSession(authOptions)

  // Fetch user data

  return (
    <div className="p-8">
      {session && session.user ? (
        <Card
          shadow="none"
          fullWidth
          radius="none"
          classNames={{
            base: 'bg-transparent',
          }}
        >
          <CardHeader>
            <div className="flex flex-row justify-between">
              <div className="flex gap-4">
                {/* User avatar */}
                <Avatar
                  showFallback
                  className="lg:w-32 lg:h-32"
                  radius="full"
                  size="lg"
                  src={session.user.image || ''}
                />

                {/* User info */}
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h1 className="text-xl lg:text-3xl font-bold leading-none text-default-600">
                    {session.user.name}
                  </h1>

                  {/* Channel subscribers */}
                  <h5 className="text-small tracking-tight text-default-400">
                    {`${formatToCompactNumber(subscribersCount)} subscribers`}
                  </h5>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <ProfileContent />
          </CardBody>
        </Card>
      ) : (
        // User is not login yet send the user to login page
        <div>
          <h1 className="text-lg font-bold pb-4 text-center md:text-left">
            Please login to view your profile
          </h1>
        </div>
      )}
    </div>
  )
}

// Display name
ProfilePage.displayName = 'ProfilePage'
