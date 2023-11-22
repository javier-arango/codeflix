import { getEnvVariable } from '@utils/index'

export const baseURL = getEnvVariable(
  'NEXT_PUBLIC_API_URL' || 'NEXT_PUBLIC_VERCEL_BRANCH_URL'
)
console.log('baseURL', baseURL)
