'use client'

import {
  VIDEO_CATEGORIES,
  type CategoryKey,
} from '@constants/videoCategories.constants'
import { Button, Chip, ScrollShadow } from '@nextui-org/react'

interface SelectListProps {
  categories: CategoryKey[]
  selected: CategoryKey
  onSelect: (category: CategoryKey) => void
}

export const SelectList = ({
  categories,
  selected,
  onSelect,
}: SelectListProps) => {
  const isCategorySelected = (category: string) => selected === category

  return (
    <ScrollShadow
      hideScrollBar
      className="w-full flex py-0.5 px-2 gap-2"
      orientation="horizontal"
    >
      {categories.map((category, index) => (
        <Chip
          key={index}
          size="lg"
          radius="sm"
          isDisabled={isCategorySelected(category)}
          variant={isCategorySelected(category) ? 'bordered' : 'solid'}
          as={Button}
          className="min-w-fit"
          onClick={() => onSelect(category)}
        >
          {VIDEO_CATEGORIES[category]}
        </Chip>
      ))}
    </ScrollShadow>
  )
}

// Display name
SelectList.displayName = 'SelectList'
