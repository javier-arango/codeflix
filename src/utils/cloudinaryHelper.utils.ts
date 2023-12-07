import crypto from 'crypto'

export function getCloudinaryPublicIdFromUrl(url: string): string | null {
  const regex = /\/upload\/(?:v\d+\/)?(.+?)\.[^.]+$/
  const match = url.match(regex)

  return match ? match[1] : null
}

export function generateSHA1ForCloudinary(data: string) {
  const hash = crypto.createHash('sha256')
  hash.update(data)

  return hash.digest('hex')
}

export function generateSignatureForCloudinary(
  publicId: string,
  apiSecret: string
) {
  const timestamp = new Date().getTime()

  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
}
