// Components
import { LoadingSpinner } from '@components/LoadingSpinner'

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
      <LoadingSpinner />
    </div>
  )
}
