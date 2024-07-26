import axios from 'axios'

export const loginService = async (username, password) => {
  const res = await axios.post('http://localhost:3000/api/auth/local/login', {
    username,
    password,
  })

  return res
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
