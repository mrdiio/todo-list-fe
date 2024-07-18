import apiClient from '@/lib/apiClient'

export const loginService = async (username, password) => {
  const res = await apiClient.post('auth/local/login', {
    username,
    password,
  })

  return res
}
