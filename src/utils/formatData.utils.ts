import { formatDistanceToNow } from 'date-fns'

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

export function formatViewsCount(viewsCount: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
  }).format(viewsCount)
}

export function formatPublishedAt(publishedAt: Date): string {
  return formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  })
}
