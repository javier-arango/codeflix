'use client'

import { useState } from 'react'
import styles from '../styles/Navbar.module.scss'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update searchTerm state to new value typed
    const value = event.target.value
    setSearchTerm(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log(searchTerm)
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