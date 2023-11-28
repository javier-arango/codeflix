import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'

export const PlaylistPreviewSkeleton = () => {
  return (
    <Card
      shadow="none"
      radius="none"
      style={{ width: '210px' }}
      classNames={{
        base: 'bg-transparent',
      }}
    >
      <CardHeader>
        <Skeleton className="flex w-full h-20 rounded-lg" />
      </CardHeader>
      <CardBody className="flex gap-2 px-3">
        <Skeleton className="w-1/2 h-2 rounded-full" />
        <Skeleton className="w-full h-2 rounded-full" />
      </CardBody>
    </Card>
  )
}

// Display name
PlaylistPreviewSkeleton.displayName = 'PlaylistPreviewSkeleton'
