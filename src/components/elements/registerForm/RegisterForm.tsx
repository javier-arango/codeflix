'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button, Form, LoadingDots } from '@components/foundation'

export const RegisterForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const registerUser = async () => {
    setLoading(true)
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setLoading(false)
    return response
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await registerUser()

    if (response.ok) {
      const userSignInResponse = await signIn('credentials', {
        redirect: false,
        ...formData,
      })

      if (!userSignInResponse?.error) {
        toast.success('Account created successfully!')
        router.push('/')
      } else {
        toast.error(userSignInResponse.error)
      }
    } else {
      const errorData = await response.json()
      toast.error(errorData.error || 'An unknown error occurred')
    }
  }

  return (
    <Form onSubmit={onSubmit} autoComplete>
      <Form.Input
        required
        type="text"
        id="first-name"
        name="firstName"
        inputLabel="First Name"
        placeholder="Enter first name"
        value={formData.firstName}
        onChange={handleInputChange}
      />

      <Form.Input
        required
        type="text"
        id="last-name"
        name="lastName"
        inputLabel="Last Name"
        placeholder="Enter last name"
        value={formData.lastName}
        onChange={handleInputChange}
      />

      <Form.Input
        required
        id="email"
        type="email"
        name="email"
        inputLabel="Email address"
        placeholder="example@example.com"
        value={formData.email}
        onChange={handleInputChange}
      />

      <Form.Input
        required
        id="password"
        type="password"
        name="password"
        inputLabel="Password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <Button type="submit" disabled={loading}>
        {loading ? <LoadingDots /> : 'Sign Up'}
      </Button>
    </Form>
  )
}

RegisterForm.displayName = 'RegisterForm'
