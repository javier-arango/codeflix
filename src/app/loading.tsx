import { Spinner } from '@nextui-org/react'

const customStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
} as React.CSSProperties

export default function Loading() {
  return (
    <div style={customStyles}>
      <Spinner size="lg" />
    </div>
  )
}

// Display name
Loading.displayName = 'Global Loading'
