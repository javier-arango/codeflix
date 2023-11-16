import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react'
import React from 'react'

interface MetadataProps {
  channelName: string
  channelAvatar?: string
  subscribersCount: number
  videoTitle: string
  videoDescription: string
  viewsCount: number
  likesCount: number
}

export const Metadata = ({
  channelName,
  // channelAvatar,
  subscribersCount,
  // videoTitle,
  videoDescription,
} // viewsCount,
// likesCount,
: MetadataProps) => {
  const [isFollowed, setIsFollowed] = React.useState(false)

  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {channelName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {subscribersCount} subscribers
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? 'bg-transparent text-foreground border-default-200'
              : ''
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? 'bordered' : 'solid'}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{videoDescription}</p>
        <span className="pt-2">
          #FrontendWithZoey
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}

// Display name
Metadata.displayName = 'Metadata'
