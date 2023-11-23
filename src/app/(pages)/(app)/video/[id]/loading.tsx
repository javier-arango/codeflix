// Components
import { LoadingSpinner } from '@components/LoadingSpinner'

const customStyles = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
} as React.CSSProperties

export default function Loading() {
  return (
    <div style={customStyles}>
      <LoadingSpinner />
    </div>
  )
}
