'use client'

import styles from '@styles/ProfileForm.module.scss'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import type { UserDetails } from 'types'
import defaultProfileImage from '../../public/assets/defaultProfile.jpg'

type Props = {
  user: UserDetails
}

export default function EditProfile(props: Props) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(props.user)

  /**
   * Handle when a value of the inputs has changed
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  /**
   * Handle when the value of text area of the bio has changed
   * @param event
   */
  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
      method: 'PATCH',
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
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
          <textarea
            id={styles.bio}
            value={formData.bio ? formData.bio : ''}
            placeholder="(Bio)"
            name="bio"
            onChange={handleTextAreaChange}
          ></textarea>
          <button id={styles.submit} type="submit">
            {loading ? threeDots : 'Save'}
          </button>
        </form>
      </div>
    </section>
  )
}
