import { prisma } from '@lib/index'
import type { User } from '@prisma/client'
import { getUserDetails } from '@services/API'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
    signOut: '/logout',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      // User credentials
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      // User authorization
      async authorize(credentials) {
        // No credentials
        if (!credentials?.email || !credentials.password) {
          return null
        }

        // Find the user
        const user: User | null = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        // Not user was found
        if (!user) {
          return null
        }

        // Check if password is valid
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        // Password is not valid
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          image: user.avatar,
          email: user.email,
          name: user.firstName + ' ' + user.lastName,
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      // Fetch the latest user data from the database
      const user = await getUserDetails(token.email as string)

      if (user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            image: user.avatar,
            email: user.email,
            name: user.firstName + ' ' + user.lastName,
          },
        }
      }

      return session
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as User
        return {
          ...token,
          id: u.id,
        }
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
