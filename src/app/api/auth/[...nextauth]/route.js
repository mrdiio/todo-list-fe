import { loginService, refreshTokenService } from '@/services/auth/auth.service'
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
        console.log('google', account)
        user.name = 'dioooooooooo'
        return profile.email_verified
      }

      return true
    },
    async jwt({ token, user, account }) {
      console.log('user', user)
      // console.log('account', account)
      // console.log('token', token)

      if (user) {
        const payload = {
          sub: user.sub,
          username: user.username,
          name: user.name,
          expiresIn: user.expiresIn,
        }
        token.user = payload

        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      // if (account.provider === 'google') {
      //   if (user) {
      //     const payload = {
      //       sub: user.id,
      //       name: user.name,
      //       email: user.email,
      //       expiresIn: account.expires_at,
      //     }

      //     token.user = payload
      //   }

      //   token.accessToken = account.access_token
      // }

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
