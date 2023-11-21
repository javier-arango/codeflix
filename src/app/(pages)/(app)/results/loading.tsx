import { Spinner } from '@nextui-org/react'

export default function Loading() {
  return (
    <div className="flex justify-center align-center w-screen h-screen">
      <Spinner size="lg" />
    </div>
  )
}

// Display name
Loading.displayName = 'ResultLoading'
