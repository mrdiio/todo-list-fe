'use client'
import { getUsersService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export default function Users() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersService(),
  })

  if (data) console.log(data.data)
  return <div>users</div>
}
