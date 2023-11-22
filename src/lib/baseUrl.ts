import { getEnvVariable } from '@utils/index'

const getBaseURL = () => {
  const vercelENV = getEnvVariable('NEXT_PUBLIC_VERCEL_ENV')

  if (getEnvVariable('NODE_ENV') === 'development') {
    return getEnvVariable('NEXT_PUBLIC_URL')
  } else {
    if (vercelENV === 'preview') {
      return `https://${getEnvVariable('NEXT_PUBLIC_VERCEL_BRANCH_URL')}`
    }
  }

  return `https://${getEnvVariable('NEXT_PUBLIC_VERCEL_URL')}`
}

// Base URL for API calls
export const baseURL = getBaseURL()
