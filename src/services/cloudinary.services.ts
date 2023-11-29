import {
  generateSHA1ForCloudinary,
  generateSignatureForCloudinary,
} from '@utils/cloudinaryHelper.utils'

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dp28illl8/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'user_avatar_upload'

export async function uploadImageToCloudinary(file: File) {
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
  const cloudName = process.env['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'] as string
  const apiKey = process.env['NEXT_PUBLIC_CLOUDINARY_API_KEY'] as string
  const apiSecret = process.env['NEXT_PUBLIC_CLOUDINARY_SECRET_KEY'] as string

  // Generate signature and timestamp
  const timestamp = new Date().getTime()
  const signature = generateSHA1ForCloudinary(
    generateSignatureForCloudinary(publicId, apiSecret)
  )

  // Request URL
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`

  // FormData
  const formData = new FormData()
  formData.append('public_id', publicId)
  formData.append('api_key', apiKey)
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
