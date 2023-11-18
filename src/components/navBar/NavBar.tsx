'use client'

import { Logo, SearchBar } from '@components/foundation'
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

export const AppNavBar = () => {
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
          // className="sm:hidden"
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
          <Button
            as={Link}
            color="primary"
            href="/auth/login"
            variant="flat"
            startContent={<FaRegCircleUser />}
          >
            Sign In
          </Button>
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
