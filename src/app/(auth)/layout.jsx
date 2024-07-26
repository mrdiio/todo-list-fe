import SignOut from '@/components/auth/SignOut'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function AuthLayout({ children }) {
  const session = await getServerSession(authOptions)

  if (session?.error === 'RefreshAccessTokenError') {
    redirect('/api/auth/signout')
  }

  return (
    <div className="grid flex-grow w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          Auth Layout
          <Image
            src={`https://ui-avatars.com/api/?name=${session.user.name}?length=2`}
            alt="Logo"
            width={50}
            height={50}
            priority
          />
          <SignOut />
          {children}
        </main>
      </div>
    </div>
  )
}
