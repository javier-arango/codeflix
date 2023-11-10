'use client'

interface ButtonProps {
  children?: React.ReactNode
  onClick?(): unknown
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
  disabled?: boolean
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  style,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn btn-blue`}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// Display name
Button.displayName = 'Button'
