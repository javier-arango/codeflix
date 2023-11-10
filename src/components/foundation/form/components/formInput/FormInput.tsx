import { Input } from '@components/foundation/input'
import { Label } from '@components/foundation/label'
import type { InputProps } from '@components/foundation/input'

interface FormInputProps extends InputProps {
  orientation?: 'horizontal' | 'vertical'
  style?: React.CSSProperties
  inputLabel: string
}

export const FormInput = ({
  orientation = 'vertical',
  style,
  onChange,
  placeholder,
  autoComplete,
  id,
  name,
  type,
  required,
  value,
  inputLabel,
}: FormInputProps) => {
  return (
    <div className={`orientation-${orientation}`} style={style}>
      <Label htmlFor={id}>{inputLabel}</Label>
      <Input
        required={required}
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}

// Display name
FormInput.displayName = 'Form.FormInput'
