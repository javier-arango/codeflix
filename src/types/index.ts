// Export everything from the types folder here

import type { Video } from '@prisma/client'
import type { StaticImageData } from 'next/image'

export type CategoryKey =
  | 'algorithms'
  | 'ai'
  | 'db'
  | 'cybersecurity'
  | 'datascience'
  | 'database'
  | 'frontend'
  | 'fullstack'
  | 'iot'
  | 'ml'
  | 'mobile'
  | 'os'
  | 'programming'
  | 'uiux'

export interface VideosResponse {
  count: number
  videos: Video[]
}

export type CategoryInfo = {
  key: CategoryKey
  name: string
  img: StaticImageData
}
