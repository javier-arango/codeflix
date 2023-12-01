'use client'

import { Tab, Tabs } from '@nextui-org/react'
import React, { useState } from 'react'

interface ProfileContentProps {
  playlists: React.ReactNode | React.ReactNode[]
}

export const ProfileContent = ({ playlists }: ProfileContentProps) => {
  const [selected, setSelected] = useState<string>('playlists')

  const handleSelectionChange = (key: string | number) => {
    setSelected(key.toString())
  }

  return (
    <Tabs
      size="lg"
      aria-label="User profile tabs"
      variant="underlined"
      classNames={{
        tabList:
          'gap-6 w-full relative rounded-none p-0 border-b border-divider',
        cursor: 'w-full',
        tab: 'max-w-fit px-0 h-12',
      }}
      selectedKey={selected}
      onSelectionChange={handleSelectionChange}
    >
      <Tab key="playlists" title="Playlists">
        <>{playlists}</>
      </Tab>
    </Tabs>
  )
}

// Display name
ProfileContent.displayName = 'ProfileContent'
