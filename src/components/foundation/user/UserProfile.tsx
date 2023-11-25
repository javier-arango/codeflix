'use client'

import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Spacer,
} from '@nextui-org/react'
import type { UserDetails } from 'types'
import { ProfileContent } from './ProfileContent'

interface UserProfileProps {
  user: UserDetails
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
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
              src={user.avatar || ''}
            />

            {/* User info */}
            <div className="flex flex-col gap-1 items-start justify-center">
              <h1 className="text-xl lg:text-3xl font-bold leading-none text-default-600">
                {user.firstName + ' ' + user.lastName}
              </h1>

              {/* User join date */}
              <h5 className="text-small lg:text-base tracking-tight text-default-400">
                {`Joined on ${new Date(user.createdAt).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}`}
              </h5>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {/* User bio */}
        <Accordion fullWidth variant="shadow" defaultExpandedKeys={['2']}>
          <AccordionItem
            key="1"
            aria-label="User bio"
            subtitle="Expand to see bio"
            title="Bio"
          >
            {user.bio || 'No bio'}
          </AccordionItem>
        </Accordion>

        <Spacer y={4} />

        {/* User profile content (playlist) */}
        <ProfileContent />
      </CardBody>
    </Card>
  )
}

// Display name
UserProfile.displayName = 'UserProfile'
