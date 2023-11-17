import { useState } from 'react'

export const useForm = (initialValues: React.ChangeEvent<HTMLInputElement>) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  return [values, handleChange]
}
