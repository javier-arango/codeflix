'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import profileImg from '../../public/assets/account_circle.svg'
import styles from '../styles/Navbar.module.scss'
import { Logo } from './Logo'
import SearchBar from './SearchBar'

export default function NavBar() {
  const { status } = useSession()

  const logout = () => {
    signOut({ redirect: false, callbackUrl: '/' })
  }

  return (
    <nav id={styles.nav}>
      <div id={styles.container} className="container">
        <Logo />
        <SearchBar />
        <ul id={styles.navItems}>
          <Link href="/categories">
            <li className={styles.navItem}>categories</li>
          </Link>
          <li className={styles.navItem}>
            {status === 'authenticated' ? (
              <Link href={'/profile'}>
                <Image
                  id={styles.profileImg}
                  src={profileImg}
                  alt="profile icon"
                />
              </Link>
            ) : (
              <Link href={'/auth'}>
                <button id={styles.authButton}>Login</button>
              </Link>
            )}
          </li>
          {status === 'authenticated' && (
            <li className={styles.navItem}>
              <button id={styles.logoutButton} onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
