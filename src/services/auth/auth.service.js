import axios from 'axios'

export const loginService = async (username, password) => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/local/login', {
      username,
      password,
    })

    return res
  } catch (error) {
    throw new Error(error.response.data?.message)
  }
}

export const refreshTokenService = async (refreshToken) => {
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
