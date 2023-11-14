import Image from 'next/image'
import styles from '../styles/Navbar.module.scss'
import profileImg from '../../public/assets/account_circle.svg'
import Link from 'next/link'

export default function NavBar() {
  const loggedIn = false

  return (
    <nav id={styles.nav}>
      <div id={styles.container} className="container">
        <h1 id={styles.logo}>Codeflix</h1>
        <input id={styles.searchBar} type="search" placeholder="Search" />
        <ul id={styles.navItems}>
          <li className={styles.navItem}>categories</li>
          <li className={styles.navItem}>
            {loggedIn ? (
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
