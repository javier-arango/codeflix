// Base64 key string
const BASE64_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

/**
 * Convert three 8-bit numbers into four 6-bit index for Base64
 * @param {number} byte1 - The first 8-bit number
 * @param {number} byte2 - The second 8-bit number
 * @param {number} byte3 - The third 8-bit number
 * @returns {string} The corresponding Base64 string
 */
const convertToBase64 = (
  byte1: number,
  byte2: number,
  byte3: number
): string => {
  const index1 = byte1 >> 2
  const index2 = ((byte1 & 3) << 4) | (byte2 >> 4)
  const index3 = ((byte2 & 15) << 2) | (byte3 >> 6)
  const index4 = byte3 & 63

  return (
    BASE64_CHARS.charAt(index1) +
    BASE64_CHARS.charAt(index2) +
    BASE64_CHARS.charAt(index3) +
    BASE64_CHARS.charAt(index4)
  )
}

/**
 * Generate a Base64-encoded 1x1 GIF in a specific color
 * @param {number} r - Red color value (0-255)
 * @param {number} g - Green color value (0-255)
 * @param {number} b - Blue color value (0-255)
 * @returns {string} Base64-encoded 1x1 GIF data URL
 */
export const generateImageBluerURL = (
  r: number,
  g: number,
  b: number
): string => {
  // Base64 color code
  const base64Color = convertToBase64(0, r, g) + convertToBase64(b, 255, 255)

  // Generate data URL
  const dataUrl = `data:image/gif;base64,R0lGODlhAQABAPAA${base64Color}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

  return dataUrl
}
