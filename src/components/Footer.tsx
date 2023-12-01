import { Logo, ThemeSwitcher } from '@components/foundation'
import { Link } from '@nextui-org/react'

export const Footer = () => {
  return (
    <footer className="border-t-1 border-gray-400">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />

          <div className="mb-6 mt-6 sm:mb-0 sm:mt-0">
            <ThemeSwitcher />
          </div>
        </div>

        <span className="block text-default-400 sm:text-center my-6 sm:mx-auto lg:my-8">
          Created with ♥ by{' '}
          <Link
            isExternal
            color="foreground"
            underline="hover"
            href="https://github.com/javier-arango"
          >
            Javier Arango
          </Link>
        </span>
      </div>
    </footer>
  )
}

// Display name
Footer.displayName = 'Footer'
