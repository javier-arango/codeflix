'use client'

export interface InputProps {
  onChange?(event: React.ChangeEvent<HTMLInputElement>): unknown
  value?: string
  id?: string
  name?: string
  required?: boolean
  placeholder?: string
  autoComplete?: boolean
  style?: React.CSSProperties
  type?: 'email' | 'password' | 'text'
}

export const Input = ({
  id,
  name,
  style,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  autoComplete = true,
}: InputProps) => {
  const autoCompleteInputs = normalizeAutoComplete(autoComplete)

  return (
    <input
      autoComplete={autoCompleteInputs}
      required={required}
      id={id}
      type={type}
      name={name}
      style={style}
      className={`input`}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

// Helper method
function normalizeAutoComplete(autoComplete?: boolean) {
  if (autoComplete == null) {
    return autoComplete
  }

  return autoComplete ? 'on' : 'off'
}

// Display name
Input.displayName = 'Input'
