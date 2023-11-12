interface AlertProps {
  message: string
  children?: React.ReactNode
  type?: 'error' | 'warning' | 'success'
}

export const Alert = ({ message, children, type = 'error' }: AlertProps) => {
  return (
    <div className={`alert alert-${type}`}>
      <div className="alert__message">{message}</div>
      {children}
    </div>
  )
}

// Display name
Alert.displayName = 'Alert'
