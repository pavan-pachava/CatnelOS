import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail, verifyPassword } from '@/lib/auth-service'

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorize attempt for:', credentials?.email)
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        try {
          const user = await getUserByEmail(credentials.email as string)

          if (!user) {
            console.log('User not found:', credentials.email)
            throw new Error('User not found')
          }

          if (!user.password_hash) {
            console.log('User has no password hash')
            throw new Error('User has no password hash')
          }

          const isPasswordValid = await verifyPassword(
            credentials.password as string,
            user.password_hash
          )

          if (!isPasswordValid) {
            console.log('Invalid password for:', credentials.email)
            throw new Error('Invalid password')
          }

          console.log('Authorize success for:', credentials.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error('Authorize error:', error)
          throw error
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: true,
})

export async function getSession() {
  return await auth()
}
