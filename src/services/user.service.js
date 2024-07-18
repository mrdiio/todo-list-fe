import apiClient from '@/lib/apiClient'

export const getUsersService = async () => {
  const res = await apiClient.get('/users')

  return res.data
}
