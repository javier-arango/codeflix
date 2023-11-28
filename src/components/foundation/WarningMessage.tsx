import { AiFillWarning } from 'react-icons/ai'

export const WarningMessage = ({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <AiFillWarning className="text-6xl text-default-500" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-default-500 text-sm">{subtitle}</p>
    </div>
  )
}

// Display name
WarningMessage.displayName = 'WarningMessage'
