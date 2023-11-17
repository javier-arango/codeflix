'use client'

import { Button, Input, Link } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export const AuthForm = ({ type }: { type: 'login' | 'register' }) => {
  const [loading, setLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  // Toggle password visibility
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible)

  // Handle form submission
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    if (type === 'login') {
      console.log(
        event.currentTarget.email.value,
        event.currentTarget.password.value
      )
      // Login onSubmit
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (res && res.error) {
        setLoading(false)
        toast.error('Invalid email or password. Please try again.')
      } else {
        router.refresh()
        router.push('/')
      }
    } else {
      // Register onSubmit
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      setLoading(false)
      if (res.ok) {
        toast.success('Account created! Redirecting to login...')
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
      } else {
        const { error } = await res.json()
        toast.error(error)
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
      {/* Inputs container */}
      <div className="flex flex-col w-full gap-6">
        {/* First and Last name input */}
        {type === 'register' && (
          <>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              size="lg"
              isRequired
              variant="bordered"
              placeholder="John"
              label="First Name"
              labelPlacement="outside"
              onChange={handleInputChange}
            />
            <Input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              size="lg"
              isRequired
              variant="bordered"
              placeholder="Doe"
              label="Last Name"
              labelPlacement="outside"
              onChange={handleInputChange}
            />
          </>
        )}

        {/* Email and password inputs */}
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          size="lg"
          isRequired
          variant="bordered"
          placeholder="example@example.com"
          label="Email Address"
          labelPlacement="outside"
          onChange={handleInputChange}
        />
        <Input
          id="password"
          variant="bordered"
          name="password"
          type={isPasswordVisible ? 'text' : 'password'}
          size="lg"
          isRequired
          placeholder="Enter your password"
          label="Password"
          labelPlacement="outside"
          description="Must be at least 8 characters long."
          onChange={handleInputChange}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={loading}
        isLoading={loading}
        fullWidth
        color="primary"
      >
        {type === 'login' ? 'Sign In' : 'Create an Account'}
      </Button>

      {/* Under content  */}
      {type === 'login' ? (
        <p className="text-center text-sm">
          Don&apos;t have an account? <Link href="/auth/register">Sign up</Link>{' '}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-semibold">
            Login here
          </Link>
        </p>
      )}
    </form>
  )
}

// Display Name
AuthForm.displayName = 'AuthForm'
