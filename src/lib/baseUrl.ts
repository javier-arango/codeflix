import { getEnvVariable } from '@utils/index'

const IS_SERVER = typeof window === 'undefined'
const getBaseURL = () => {
  if (IS_SERVER) {
    if (getEnvVariable('NODE_ENV') === 'development') {
      return getEnvVariable('NEXT_PUBLIC_URL')
    }

    return `https://${getEnvVariable('VERCEL_URL')}`
  }

  return window.location.origin
}

// Base URL for API calls
export const baseURL = getBaseURL()
