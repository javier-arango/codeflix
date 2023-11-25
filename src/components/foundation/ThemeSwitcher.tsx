'use client'

import { Skeleton, Switch } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full flex flex-row gap-2">
        <Skeleton className="h-7 w-3/5 rounded-lg" />
        <Skeleton className="h-7 w-4/5 rounded-lg" />
      </div>
    )
  }

  return (
    <>
      <Switch
        name="theme-switcher"
        value={theme}
        className="capitalize"
        isSelected={theme === 'dark'}
        onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
        startContent={<BsFillSunFill />}
        endContent={<BsFillMoonFill />}
      >
        {theme} mode
      </Switch>
    </>
  )
}

// Display name
ThemeSwitcher.displayName = 'ThemeSwitcher'
