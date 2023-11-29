'use client'

import { Logo, SearchBar } from '@components/foundation'
import {
  Avatar,
  Button,
  Link,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

interface AppNavBarProps {
  session: Session | null
}

export const AppNavBar = ({ session }: AppNavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Helper components
  const LoginButton = () => {
    return (
      <Button
        as={Link}
        color="primary"
        href="/auth/login"
        variant="flat"
        startContent={<FaRegCircleUser />}
      >
        Sign In
      </Button>
    )
  }

  return (
    <Navbar
      maxWidth="full"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Logo */}
      <NavbarContent>
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      {/* Search Bar */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <SearchBar />
        </NavbarItem>
      </NavbarContent>

      {/* Sign In Button or User Profile */}
      <NavbarContent justify="end">
        <NavbarItem>
          {session && session.user ? (
            <Popover backdrop="blur" placement="bottom">
              <PopoverTrigger>
                <Avatar
                  isBordered
                  showFallback
                  className="cursor-pointer"
                  src={session.user.image || ''}
                />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <div className="px-1 py-2">
                  <Listbox
                    variant="faded"
                    aria-label="Listbox menu"
                    onAction={(key) => {
                      if (key === 'logout') {
                        signOut()
                      }
                    }}
                  >
                    <ListboxItem key="profile" href="/user/profile">
                      Profile
                    </ListboxItem>
                    <ListboxItem key="edit" href="/user/profile/edit">
                      Edit Profile
                    </ListboxItem>
                    <ListboxItem key="playlist" href="/user/playlist">
                      Playlist
                    </ListboxItem>
                    <ListboxItem key="history" showDivider href="/user/history">
                      History
                    </ListboxItem>
                    <ListboxItem
                      key="logout"
                      className="text-danger"
                      color="danger"
                    >
                      Sign Out
                    </ListboxItem>
                  </Listbox>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <LoginButton />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

// Display name
AppNavBar.displayName = 'AppNavBar'
