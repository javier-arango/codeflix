import { prisma } from '@lib/index'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { User } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth',
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
          email: user.email,
          name: user.firstName + ' ' + user.lastName,
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
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
