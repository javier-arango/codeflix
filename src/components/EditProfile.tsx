'use client'

import styles from '@styles/ProfileForm.module.scss'
import { useState } from 'react'
import type { UserDetails } from 'types'
import defaultProfileImage from '../../public/assets/defaultProfile.jpg'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'

type Props = {
  user: UserDetails
}

export default function EditProfile(props: Props) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(props.user)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  /**
   * Make request to server to save user updates
   * @returns response with message if successful or not
   */
  const saveUpdates = async () => {
    setLoading(true)
    const response = await fetch('/api/user/profile/edit', {
      method: 'POST',
      body: JSON.stringify({ email: props.user.email, newValues: formData }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setLoading(false)
    return await response.json()
  }

  /**
   * Handle when the form is submitted
   */
  const onSubmit = async () => {
    const response = await saveUpdates()

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success(response.message)
    }
  }

  // Loading three dots component
  const threeDots = (
    <ThreeDots
      height="20"
      width="20"
      radius="9"
      color="white"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      visible={true}
    />
  )

  return (
    <section>
      <div id={styles.container} className="container">
        <h1 id={styles.title}>Edit Profile</h1>
        <div
          id={styles.pic}
          style={{
            backgroundImage: `url(${
              formData.avatar || defaultProfileImage.src
            })`,
          }}
        ></div>
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
          <textarea
            id={styles.bio}
            value={formData.bio ? formData.bio : ''}
            placeholder="(Bio)"
          ></textarea>
          <button id={styles.submit} type="submit">
            {loading ? threeDots : 'Save'}
          </button>
        </form>
      </div>
    </section>
  )
}
