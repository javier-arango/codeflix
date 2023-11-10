import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { NavBar } from '@components/index'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <h1>Cinemify</h1>
      <NavBar userName={JSON.stringify(session?.user?.name)} />

      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'
