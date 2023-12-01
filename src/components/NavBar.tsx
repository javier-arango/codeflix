'use client'

import { Logo, SearchBar } from '@components/foundation'
import {
  Avatar,
  Button,
  Divider,
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
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaPen, FaRegCircleUser, FaRegUser } from 'react-icons/fa6'
import { MdLogout } from 'react-icons/md'

export const AppNavBar = ({
  initialSession,
}: {
  initialSession: Session | null
}) => {
  const { data: currentSession } = useSession()
  const [session, setSession] = useState(initialSession)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Update session state only if it's different from the current state
    if (currentSession && currentSession !== session) {
      setSession(currentSession)
    }
  }, [currentSession, session])

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

  const PopoverTopContentMarkup = ({
    name,
    image,
  }: {
    name?: string | null
    image?: string | null
  }) => {
    if (!image || !name) {
      return null
    }

    return (
      <>
        <div className="flex flex-row gap-2 pb-2">
          {/* User avatar */}
          <Avatar showFallback size="sm" src={image} />

          {/* User name */}
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {name}
            </h4>
          </div>
        </div>

        <Divider />
      </>
    )
  }

  const PopoverContentMarkUp = ({
    topContent,
  }: {
    topContent: React.ReactNode
  }) => {
    return (
      <Listbox
        variant="faded"
        hideEmptyContent
        aria-label="Listbox menu"
        topContent={topContent}
        onAction={(key) => {
          if (key === 'logout') {
            signOut()
          }
        }}
      >
        <ListboxItem
          key="profile"
          href="/user/profile"
          startContent={<FaRegUser />}
        >
          Profile
        </ListboxItem>
        <ListboxItem
          key="edit"
          showDivider
          href="/user/profile/edit"
          startContent={<FaPen />}
        >
          Edit Profile
        </ListboxItem>
        <ListboxItem
          key="logout"
          className="text-danger"
          color="danger"
          startContent={<MdLogout />}
        >
          Sign Out
        </ListboxItem>
      </Listbox>
    )
  }

  const RenderUserMenu = () => {
    if (session && session.user) {
      // Render user profile if session is available
      return (
        <Popover backdrop="opaque" size="lg" placement="bottom">
          <PopoverTrigger>
            <Avatar
              isBordered
              showFallback
              className="cursor-pointer"
              src={session.user.image || ''}
            />
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <PopoverContentMarkUp
              topContent={
                <PopoverTopContentMarkup
                  name={session.user.name}
                  image={session.user.image}
                />
              }
            />
          </PopoverContent>
        </Popover>
      )
    } else {
      // Render login button if no session
      return <LoginButton />
    }
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
          <Logo className="hidden md:block" />
        </NavbarBrand>
      </NavbarContent>

      {/* Search Bar */}
      <NavbarContent justify="center">
        <NavbarItem className="lg:w-[400px] md:w-[300px]">
          <SearchBar />
        </NavbarItem>
      </NavbarContent>

      {/* Sign In Button or User Profile */}
      <NavbarContent justify="end">
        <NavbarItem>
          <RenderUserMenu />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

// Display name
AppNavBar.displayName = 'AppNavBar'
