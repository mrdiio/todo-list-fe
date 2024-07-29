import axios from 'axios'

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
})

export const loginService = async (username, password) => {
  try {
    const res = await authApi.post('/local/login', {
      username,
      password,
    })

    return res
  } catch (error) {
    throw new Error(error.response.data?.message)
  }
}

export const refreshTokenService = async (refreshToken) => {
  const res = await authApi.post(
    '/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )

  return res
}
