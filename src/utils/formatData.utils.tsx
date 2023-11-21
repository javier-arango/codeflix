import { formatDistanceToNow } from 'date-fns'
import React from 'react'

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

/**
 * Format a number to english format
 * Example 1000 -> 1,000
 * @param number
 * @returns
 */
export function formatToCompactNumber(number: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
  }).format(number)
}

export function formatPublishedAt(publishedAt: Date): string {
  return formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  })
}

export function formatDescription(description: string): JSX.Element[] {
  return description.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))
}
