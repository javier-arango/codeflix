import Link from 'next/link'

export default function LogoutPage() {
  return (
    <div>
      <h1>Leaving So Soon?</h1>
      <p>
        Just so you know, you do not always need to sign out of Codeflix. It is
        only necessary if you are on a shared or public computer.
      </p>

      <p>Click the button below to be redirected to Codeflix home page.</p>

      <Link href="/">Go Now</Link>
    </div>
  )
}

// Display name
LogoutPage.displayName = 'LogoutPage'
