'use client'

import { useState } from 'react'
import styles from '../styles/AuthForm.module.scss'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { ThreeDots } from 'react-loader-spinner'

export default function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const callbackUrl = searchParams.get('callbackUrl') || '/' // Redirect to home page if no callbackUrl is provided
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  // Loading three dots component
  const threeDots = (
    <ThreeDots
      height="20"
      width="20"
      radius="9"
      color="white"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      visible={true}
    />
  )

  /**
   * Handle when a value of a input has changed to update the form data
   * @param event 
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  /**
   * Switch between the login and signup form
   */
  const switchForm = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    })
  }

  /**
   * Just to prevent an ESlint errors, it is not being used
   */
  const handleKeyDown = () => {
    switchForm()
  }

  /**
   * Make request to the server to register the user
   * @returns response from request
   */
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

  /**
   * Handle when the user clicks the signup button
   * @param event 
   */
  const onSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
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

  /**
   * Handle when the user clicks the login button
   * @param event 
   */
  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const email = formData.email
    const password = formData.password

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setLoading(false)
        toast.error('Invalid email or password')
      }
    } catch (err) {}
  }

  return (
    <form
      id={styles.form}
      onSubmit={isSignup ? onSubmitRegister : onSubmitLogin}
    >
      {isSignup && (
        <>
          <input
            required
            className={styles.input}
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            required
            className={styles.input}
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </>
      )}
      <input
        required
        className={styles.input}
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        required
        className={styles.input}
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button id={styles.submit} type="submit">
        {loading ? threeDots : isSignup ? 'Signup' : 'Login'}
      </button>
      {isSignup ? (
        <h2>
          Aleady have an account?{' '}
          <span
            className={styles.switch}
            onClick={switchForm}
            onKeyDown={handleKeyDown}
          >
            Login
          </span>
        </h2>
      ) : (
        <h2>
          Don&apos;t have an account?{' '}
          <span
            className={styles.switch}
            onClick={switchForm}
            onKeyDown={handleKeyDown}
          >
            Sign Up
          </span>
        </h2>
      )}
    </form>
  )
}
