'use client'

import styles from '@styles/Navbar.module.scss'
import { signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  // const router = useRouter()

  const logout = () => {
    console.log('clicked')
    // router.push('/')
    signOut({ redirect: false, callbackUrl: '/' })
  }

  return (
    <li className={styles.navItem}>
      <button id={styles.logoutButton} onClick={logout}>
        Logout
      </button>
    </li>
  )
}
