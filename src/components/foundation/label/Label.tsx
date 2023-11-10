'use client'

export interface LabelProps {
  children?: React.ReactNode
  style?: React.CSSProperties
  htmlFor?: string
}

export const Label = ({ children, style, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`label`} style={style}>
      {children}
    </label>
  )
}

// Display name
Label.displayName = 'Label'
