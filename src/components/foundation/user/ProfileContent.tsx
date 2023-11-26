'use client'

import { Tab, Tabs } from '@nextui-org/react'
import { useState } from 'react'

export const ProfileContent = () => {
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
        <div>Playlists</div>
      </Tab>
      <Tab key="history" title="History">
        <div>History</div>
      </Tab>
    </Tabs>
  )
}

// Display name
ProfileContent.displayName = 'ProfileContent'
