'use client'

import { useCallback } from 'react'

interface FormProps {
  children?: React.ReactNode
  onSubmit(event: React.FormEvent<HTMLFormElement>): unknown
  method?: 'post' | 'get' | 'put' | 'delete'
  target?: '_blank' | '_self' | '_parent' | '_top' | string
  action?: string
  autoComplete?: boolean
  name?: string
  preventDefault?: boolean
  style?: React.CSSProperties
}

export const Form = ({
  children,
  onSubmit,
  method = 'post',
  target,
  action,
  autoComplete = true,
  name,
  preventDefault = true,
  style,
}: FormProps) => {
  const autoCompleteInputs = normalizeAutoComplete(autoComplete)

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (!preventDefault) {
        return
      }

      event.preventDefault()
      onSubmit(event)
    },
    [onSubmit, preventDefault]
  )

  return (
    <form
      name={name}
      onSubmit={handleSubmit}
      autoComplete={autoCompleteInputs}
      method={method}
      target={target}
      action={action}
      style={style}
    >
      {children}
    </form>
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
Form.displayName = 'Form'
