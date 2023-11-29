'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from '../styles/Navbar.module.scss'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  /**
   * Handle when the search bar input value has changed
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update searchTerm state to new value typed
    const value = event.target.value
    setSearchTerm(value)
  }

  /**
   * Handle when the user press enter to search for a term
   * @param event
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchTerm != '') {
        router.push(`/results/${encodeURI(searchTerm)}`)
      }
    }
  }

  return (
    <input
      id={styles.searchBar}
      type="search"
      placeholder="Search"
      value={searchTerm}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  )
}
