import Banner from "@components/Banner"
import NavBar from "@components/NavBar"

export default function HomePage() {
  return (
    <main>
      <NavBar />
      <Banner />
    </main>
  )
}

// Display name
HomePage.displayName = 'HomePage'