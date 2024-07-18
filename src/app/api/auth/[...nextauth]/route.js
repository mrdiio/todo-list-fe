import { loginService } from '@/services/auth/auth.service'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials
        const res = await loginService(username, password)

        const accessToken = res.headers['set-cookie'][0]
          .split(';')[0]
          .split('=')[1]

        const refreshToken = res.headers['set-cookie'][1]
          .split(';')[0]
          .split('=')[1]

        if (res.status === 200)
          return { ...res.data.data, accessToken, refreshToken }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const payload = {
          sub: user.sub,
          username: user.username,
          name: user.name,
        }
        token.user = payload

        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.user = token.user

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
