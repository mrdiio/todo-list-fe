import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

const apiClient = axios.create({
  // baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  baseURL: '/backend',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession()

  const accessToken = session?.accessToken

  // set accessToken to Cookie
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

// redirect to login page if unauthorized
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      const session = await getSession()
      if (session) {
        if (session.error === 'RefreshAccessTokenError') {
          console.log('logged out')
          signOut()
        }
      }

      console.log('error 401')
      // signOut()
    }

    return Promise.reject(error)
  }
)

export default apiClient
