import Image from 'next/image'
import Link from 'next/link'
import profileImg from '../../public/assets/account_circle.svg'
import styles from '../styles/Navbar.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import SearchBar from './SearchBar'

export default async function NavBar() {
  const session = await getServerSession(authOptions)

  return (
    <nav id={styles.nav}>
      <div id={styles.container} className="container">
        <Link href="/">
          <h1 id={styles.logo}>Codeflix</h1>
        </Link>
        <SearchBar />
        <ul id={styles.navItems}>
          <Link href="/categories">
            <li className={styles.navItem}>categories</li>
          </Link>
          <li className={styles.navItem}>
            {session ? (
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
        </ul>
      </div>
    </nav>
  )
}
