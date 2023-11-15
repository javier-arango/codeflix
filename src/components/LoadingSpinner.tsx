// Styles
import styles from '@styles/LoadingSpinner.module.scss'

interface LoadingSpinnerProps {
  style?: React.CSSProperties
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export const LoadingSpinner = ({
  style,
  className,
  size = 'large',
}: LoadingSpinnerProps) => {
  return (
    <span
      className={`${styles.loadingSpinner} ${styles[size]} ${className}`}
      style={style}
    />
  )
}

// Display name
LoadingSpinner.displayName = 'LoadingSpinner'
