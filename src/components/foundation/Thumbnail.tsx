import { Image } from '@nextui-org/react'
import NextImage from 'next/image'

export interface ThumbnailProps {
  src: string
  alt: string
  priority?: boolean
  isBlurred?: boolean
  isZoomed?: boolean
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

export const Thumbnail = ({
  src,
  alt,
  priority = false,
  isBlurred = false,
  isZoomed = false,
  shadow = 'none',
  radius = 'none',
  style,
}: ThumbnailProps) => {
  return (
    <Image
      as={NextImage}
      src={src}
      alt={alt}
      style={style}
      shadow={shadow}
      isBlurred={isBlurred}
      isZoomed={isZoomed}
      radius={radius}
      classNames={{
        wrapper: 'relative w-full aspect-video padding-top-16x9',
        img: 'absolute inset-0 opacity-100 transition-opacity duration-500 ease-in-out',
      }}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 33vw"
      fill
    />
  )
}

// Display name
Thumbnail.displayName = 'Thumbnail'
