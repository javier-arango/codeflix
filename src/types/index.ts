import type { Video } from '@prisma/client'

export interface SearchResponse {
  count: number
  result: Video[]
}
