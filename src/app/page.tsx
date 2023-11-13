import { getServerSession } from 'next-auth'
import { authOptions } from './api/(auth)/auth/[...nextauth]/route'
import NavBar from '@components/NavBar'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      {/* <NavBar userName={JSON.stringify(session?.user?.name)} /> */}
      <NavBar />

      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'
