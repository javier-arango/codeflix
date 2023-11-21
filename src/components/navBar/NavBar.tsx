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
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

interface AppNavBarProps {
  session: Session | null
}

export const AppNavBar = ({ session }: AppNavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentPath = usePathname()

  const menuItems = [
    {
      name: 'Profile',
      href: '/profile',
    },
    {
      name: 'Playlist',
      href: '/playlist',
    },
    {
      name: 'History',
      href: '/history',
    },
    {
      name: 'Log Out',
      href: '/auth/logout',
    },
  ]

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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
        <NavbarBrand>
          <Link href="/" color="foreground">
            <Logo />
            <p className="font-bold text-inherit uppercase">Cinemify</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Search Bar */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <SearchBar />
        </NavbarItem>
      </NavbarContent>

      {/* Sign In Button */}
      <NavbarContent justify="end">
        <NavbarItem>
          {session && session.user ? (
            <Popover showArrow backdrop="blur" placement="bottom">
              <PopoverTrigger>
                <Avatar
                  isBordered
                  showFallback
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
                    <ListboxItem key="profile">Profile</ListboxItem>
                    <ListboxItem key="edit" showDivider>
                      Edit Profile
                    </ListboxItem>
                    <ListboxItem
                      key="logout"
                      className="text-danger"
                      color="danger"
                    >
                      Logout
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

      {/* Menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              isBlock
              isDisabled={currentPath === item.href}
              className="w-full"
              underline={currentPath === item.href ? 'always' : 'none'}
              color={'foreground'}
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

// Display name
AppNavBar.displayName = 'AppNavBar'
