'use client'

import styles from '@styles/ProfileForm.module.scss'
import { useState } from 'react'

export default function EditProfilePage () {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const onSubmit = () => {

  }

  return (
    <section>
      <div id={styles.container} className="container">
        <h1 id={styles.title}>Edit Profile</h1>
        <form
          id={styles.form}
          onSubmit={onSubmit}
        >
          <input
            required
            className={styles.input}
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            required
            className={styles.input}
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input
            required
            className={styles.input}
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            required
            className={styles.input}
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input
            id={styles.submit}
            type="submit"
            value={'Save'}
          />
        </form>
      </div>
    </section>
  )
}

// Display name
EditProfilePage.displayName = 'Edit Profile'