'use client'

import styles from '@styles/ProfileForm.module.scss'
import { useState } from 'react'
import type { UserDetails } from 'types'

type Props = {
  user: UserDetails
}

export default function EditProfile(props: Props) {
  const [formData, setFormData] = useState(props.user)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const onSubmit = () => {}
  
  return (
    <section>
      <div id={styles.container} className="container">
        <h1 id={styles.title}>Edit Profile</h1>
        <form id={styles.form} onSubmit={onSubmit}>
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
          <textarea value={formData.bio} placeholder='(Bio)'></textarea>
          <input id={styles.submit} type="submit" value={'Save'} />
        </form>
      </div>
    </section>
  )
}
