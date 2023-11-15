import NavBar from '@components/NavBar'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <NavBar />
      <Link href="/video/8mAITcNt710" style={{ color: 'black' }}>
        Click here to watch a video about CS
      </Link>
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'
