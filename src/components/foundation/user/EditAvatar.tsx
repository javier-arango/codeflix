'use client'

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from '@services/cloudinary.services'
import { getCloudinaryPublicIdFromUrl } from '@utils/cloudinaryHelper.utils'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BsFillTrash3Fill, BsUpload } from 'react-icons/bs'
import { FaPen } from 'react-icons/fa6'

interface EditAvatarProps {
  avatar?: string
  onChange: (avatarUrl: string) => void
}

export const EditAvatar = ({ avatar, onChange }: EditAvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(avatar)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImageToCloudinary(file)

      // Update the user profile here with the new avatar URL
      setAvatarUrl(imageUrl)
      onChange(imageUrl)
      toast.success('Image uploaded successfully.')
    } catch (error) {
      toast.error('An error occurred while uploading the image.')
      throw new Error('An error occurred while uploading the image.')
    }
  }

  const handleAvatarRemoval = async (imageUrl: string) => {
    try {
      const imagePublicId = getCloudinaryPublicIdFromUrl(imageUrl)
      console.log(imagePublicId)

      if (!imagePublicId) {
        throw new Error('Invalid image URL')
      }

      // Update the user profile here with the new avatar URL
      setAvatarUrl(undefined)
      onChange('')

      // Removed image from cloudinary
      await deleteImageFromCloudinary(imagePublicId)
      toast.success('Image removed successfully.')
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while removing the image.')
      throw new Error('An error occurred while removing the image.')
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleAvatarUpload(file)
    }
  }

  return (
    <div className="relative">
      <Avatar
        showFallback
        className="w-32 h-32"
        radius="full"
        size="lg"
        src={avatarUrl}
      />

      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            size="sm"
            color="primary"
            aria-label="Edit avatar image"
            className="absolute bottom-2 right-2 z-10"
          >
            <FaPen />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Avatar editing menu">
          <DropdownItem
            key="uploadImage"
            startContent={<BsUpload />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload a photo
          </DropdownItem>
          <DropdownItem
            key="removeImage"
            startContent={<BsFillTrash3Fill />}
            onClick={() => handleAvatarRemoval(avatar || '')}
          >
            Remove photo
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

// Display name
EditAvatar.displayName = 'EditAvatar'
