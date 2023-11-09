import styles from '../styles/Navbar.module.scss';

export default function NavBar() {
    return (
      <nav id={styles.nav}>
        <div id={styles.container} className="container">
          <h1 id={styles.logo} >Codeflix</h1>
          <input id={styles.searchBar} type="search" placeholder="Search" />
          <ul id={styles.navItems}>
            <li className={styles.navItem}>categories</li>
            <li className={styles.navItem}>
              <button id={styles.authButton}>Login</button>
            </li>
          </ul>
        </div>
      </nav>
    )
}