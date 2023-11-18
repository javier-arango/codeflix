'use client'

import { Button, Input, Link } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface AuthFormData {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export const AuthForm = ({ type }: { type: 'login' | 'register' }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AuthFormData>({ mode: 'onChange' })

  // Toggle password visibility
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible)

  // Handle form submission
  const onSubmit: SubmitHandler<AuthFormData> = async (data: AuthFormData) => {
    if (type === 'login') {
      // Login onSubmit
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (res && res.error) {
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
        body: JSON.stringify(data),
      })

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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-6"
      >
        {/* Inputs container */}
        <div className="flex flex-col w-full gap-6">
          {/* First and Last name input */}
          {type === 'register' && (
            <>
              <Input
                id="firstName"
                type="text"
                autoComplete="given-name"
                size="lg"
                isRequired
                variant="bordered"
                placeholder="John"
                label="First Name"
                labelPlacement="outside"
                isInvalid={Boolean(errors.firstName)}
                errorMessage={errors.firstName?.message}
                {...register('firstName', {
                  required: {
                    value: true,
                    message: 'First name is required.',
                  },
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters long.',
                  },
                  maxLength: {
                    value: 20,
                    message: 'First name must be less than 20 characters.',
                  },
                })}
              />
              <Input
                id="lastName"
                type="text"
                autoComplete="family-name"
                size="lg"
                isRequired
                variant="bordered"
                placeholder="Doe"
                label="Last Name"
                labelPlacement="outside"
                isInvalid={Boolean(errors.lastName)}
                errorMessage={errors.lastName?.message}
                {...register('lastName', {
                  required: {
                    value: true,
                    message: 'Last name is required.',
                  },
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters long.',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Last name must be less than 20 characters.',
                  },
                })}
              />
            </>
          )}

          {/* Email and password inputs */}
          <Input
            id="email"
            type="email"
            autoComplete="email"
            size="lg"
            isRequired
            variant="bordered"
            placeholder="example@example.com"
            label="Email Address"
            labelPlacement="outside"
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required.',
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
          />
          <Input
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            size="lg"
            isRequired
            variant="bordered"
            placeholder="Enter your password"
            label="Password"
            labelPlacement="outside"
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required.',
              },
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long.',
              },
            })}
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
          disabled={isSubmitting}
          isLoading={isSubmitting}
          fullWidth
          color="primary"
        >
          {type === 'login' ? 'Sign In' : 'Create an Account'}
        </Button>

        {/* Under content  */}
        {type === 'login' ? (
          <p className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register">Sign up</Link> for free.
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
    </>
  )
}

// Display Name
AuthForm.displayName = 'AuthForm'
