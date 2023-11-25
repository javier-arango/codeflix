'use client'

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { useState } from 'react'

export const ProfileContent = () => {
  const [selected, setSelected] = useState('playlists')

  return (
    <Tabs
      aria-label="User profile tabs"
      variant="underlined"
      classNames={{
        tabList:
          'gap-6 w-full relative rounded-none p-0 border-b border-divider',
        cursor: 'w-full',
        tab: 'max-w-fit px-0 h-12',
      }}
      selectedKey={selected}
      onSelectionChange={setSelected}
    >
      <Tab key="playlists" title="Playlists">
        <Card>
          <CardBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="history" title="History">
        <Card>
          <CardBody>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  )
}

// Display name
ProfileContent.displayName = 'ProfileContent'
