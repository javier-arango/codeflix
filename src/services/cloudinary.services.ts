import {
  generateSHA1ForCloudinary,
  generateSignatureForCloudinary,
} from '@utils/cloudinaryHelper.utils'

export async function uploadImageToCloudinary(file: File) {
  // Cloudinary credentials
  const CLOUD_NAME = process.env['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'] as string
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const CLOUDINARY_UPLOAD_PRESET = 'user_avatar_upload'

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })

    const imageUrl = await response.json().then((data) => data.secure_url)

    return imageUrl
  } catch (error) {
    console.error(error)
    throw new Error('Error uploading image to Cloudinary')
  }
}

export async function deleteImageFromCloudinary(publicId: string) {
  // Cloudinary credentials
  const CLOUD_NAME = process.env['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'] as string
  const API_KEY = process.env['NEXT_PUBLIC_CLOUDINARY_API_KEY'] as string
  const API_SECRET = process.env['NEXT_PUBLIC_CLOUDINARY_SECRET_KEY'] as string

  // Generate signature and timestamp
  const timestamp = new Date().getTime()
  const signature = generateSHA1ForCloudinary(
    generateSignatureForCloudinary(publicId, API_SECRET)
  )

  // Request URL
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`

  // FormData
  const formData = new FormData()
  formData.append('public_id', publicId)
  formData.append('api_key', API_KEY)
  formData.append('timestamp', timestamp.toString())
  formData.append('signature', signature)

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error('Error deleting image from Cloudinary')
  }
}
