import apiClient from '@/lib/apiClient'

export const loginService = async (username, password) => {
  const res = await apiClient.post('auth/local/login', {
    username,
    password,
  })

  return res
}

export const refreshTokenService = async (refreshToken) => {
  const res = await apiClient.post(
    'auth/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )

  return res
}
