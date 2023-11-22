import { Logo } from '@components/foundation'
import { Link } from '@nextui-org/react'

export const Footer = () => {
  return (
    <footer className="border-t-1 border-gray-400">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <span className="block text-default-400 sm:text-center my-6 sm:mx-auto lg:my-8">
          Created with ♥ by{' '}
          <Link
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
