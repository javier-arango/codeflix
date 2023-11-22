import { getEnvVariable } from '@utils/index'

// Get env variable
const env = getEnvVariable('NEXT_PUBLIC_VERCEL_ENV')

// Vercel
const isProduction =
  env === 'production' && `https://${getEnvVariable('NEXT_PUBLIC_VERCEL_URL')}`

const isPreview =
  env === 'preview' &&
  `https://${getEnvVariable('NEXT_PUBLIC_VERCEL_BRANCH_URL')}`

const isDevelopment =
  env === 'development' && getEnvVariable('NEXT_PRIVATE_URL')

// BAse URL
export const baseURL = isProduction || isPreview || isDevelopment
