import { AuthForm, Logo } from '@components/foundation'
import Link from 'next/link'

export default function Login() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          color="foreground"
          className="flex items-center mb-6 text-2xl uppercase font-semibold"
        >
          <Logo />
          <p>Cinemify</p>
        </Link>

        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-900">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight">
              Create an Account
            </h1>
            <AuthForm type="register" />
          </div>
        </div>
      </div>
    </section>
  )
}
