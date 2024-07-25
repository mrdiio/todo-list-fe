import apiClient from '@/lib/apiClient'
import axios from 'axios'

export const loginService = async (username, password) => {
  // const res = await apiClient.post('auth/local/login', {
  const res = await axios.post('http://localhost:3000/api/auth/local/login', {
    username,
    password,
  })

  return res
}

export const refreshTokenService = async (refreshToken) => {
  // const res = await apiClient.post(
  //   'auth/refresh',
  const res = await axios.post(
    'http://localhost:3000/api/auth/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )

  return res
}
