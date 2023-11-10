'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button, Form, Input, Label, LoadingDots } from '@components/foundation'

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
    const response = await fetch('/api/register', {
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
        toast.success(
          'Account created successfully! Redirecting to home page...'
        )
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
      <div>
        <Label htmlFor="first-name">First Name</Label>
        <Input
          required
          type="text"
          id="first-name"
          name="firstName"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor="last-name">Last Name</Label>
        <Input
          required
          type="text"
          id="last-name"
          name="lastName"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          required
          id="email"
          type="email"
          name="email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          required
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? <LoadingDots /> : 'Sign Up'}
      </Button>
    </Form>
  )
}

RegisterForm.displayName = 'RegisterForm'
