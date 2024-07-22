import apiClient from '@/lib/apiClient'
import { loginService } from '@/services/auth/auth.service'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshAccessToken(token) {
  const res = await apiClient.post('/auth/refresh-token', {
    headers: {
      Authorization: `Bearer ${token.refreshToken}`,
    },
  })

  console.log('refreshed')

  console.log('res', res)

  return {
    ...token,
  }
}

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
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
        }
        token.user = payload
        token.expiresIn = user.expiresIn

        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      // if (new Date().getTime() < token.expiresIn) return token

      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
