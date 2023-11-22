import { getEnvVariable } from '@utils/index'

const getBaseURL = () => {
  if (getEnvVariable('NODE_ENV') === 'development') {
    return getEnvVariable('NEXT_PUBLIC_URL')
  }

  // This URL is only available in Vercel
  return `https://${getEnvVariable('VERCEL_URL')}`
}

// Base URL for API calls
export const baseURL = getBaseURL()
