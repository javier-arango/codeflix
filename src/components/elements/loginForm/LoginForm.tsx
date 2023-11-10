'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button, Form, Input, Label, LoadingDots } from '@components/foundation'

export const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/' // Redirect to home page if no callbackUrl is provided
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

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
    <Form onSubmit={onSubmit}>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          required
          type="email"
          id="email"
          name="email"
          autoComplete
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
        />
      </div>

      <div>
        <Label htmlFor="password"> Password </Label>
        <Input
          required
          id="password"
          type="password"
          name="password"
          autoComplete={false}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? <LoadingDots color="#808080" /> : <p>Sign In</p>}
      </Button>
    </Form>
  )
}

// Display name
LoginForm.displayName = 'LoginForm'
