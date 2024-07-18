import { getServerSession } from 'next-auth'
import Users from './users'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function UserPage() {
  return (
    <div>
      UserPage
      <Users />
    </div>
  )
}
