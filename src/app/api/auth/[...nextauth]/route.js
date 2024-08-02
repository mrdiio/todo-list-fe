import { loginService, refreshTokenService } from '@/services/auth/auth.service'
import axios from 'axios'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

async function refreshAccessToken(token) {
  try {
    const res = await refreshTokenService(token.refreshToken)

    const payload = {
      sub: res.data.data.sub,
      username: res.data.data.username,
      name: res.data.data.name,
      expiresIn: res.data.data.expiresIn,
    }

    const accessToken = res.headers['set-cookie'][0].split(';')[0].split('=')[1]

    const refreshToken = res.headers['set-cookie'][1]
      .split(';')[0]
      .split('=')[1]

    console.log('refreshed')

    return { user: payload, accessToken, refreshToken }
  } catch (error) {
    console.log('error refresh', error.response.data)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        // const dbUser = await fetch(
        //   `http://localhost:3000/api/auth/google/verify?token=${account.id_token}`,
        //   {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   }
        // ).then((res) => res.json())

        try {
          const res = await axios.get(
            `http://localhost:3000/api/auth/google/verify?token=${account.id_token}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          const accessToken = res.headers['set-cookie'][0]
            .split(';')[0]
            .split('=')[1]

          const refreshToken = res.headers['set-cookie'][1]
            .split(';')[0]
            .split('=')[1]

          user.sub = res.data.data.sub
          user.username = res.data.data.username
          user.name = res.data.data.name
          user.email = res.data.data.email
          user.expiresIn = res.data.data.expiresIn
          user.accessToken = accessToken
          user.refreshToken = refreshToken
        } catch (error) {
          return false
        }

        return profile.email_verified
      }

      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        const payload = {
          sub: user.sub,
          username: user.username,
          name: user.name,
          expiresIn: user.expiresIn,
          provider: account.provider,
        }
        token.user = payload

        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      return token

      if (new Date().getTime() < token.user.expiresIn) {
        return token
      }

      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user
      session.error = token.error || null

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
