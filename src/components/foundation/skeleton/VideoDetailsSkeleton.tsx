import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'

export const VideoDetailsSkeleton = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Skeleton className="flex rounded-full w-12 h-12" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <Skeleton className="w-32 h-4 rounded-full" />
            <Skeleton className="w-24 h-3 rounded-full" />
          </div>
        </div>
        <Skeleton className="w-20 h-8 rounded-full" />
      </CardHeader>
      <CardBody className="flex gap-2 px-3 py-3">
        <Skeleton className="w-full h-6 rounded-full" />
        <Skeleton className="w-full h-6 rounded-full" />
        <Skeleton className="w-full h-6 rounded-full" />
        <Skeleton className="w-2/3 h-6 rounded-full" />

        <div className="flex flex-row gap-1 pt-5">
          <Skeleton className="w-32 h-6 rounded-full" />
          <Skeleton className="w-32 h-6 rounded-full" />
        </div>
      </CardBody>
    </Card>
  )
}

// Display name
VideoDetailsSkeleton.displayName = 'VideoDetailsSkeleton'
