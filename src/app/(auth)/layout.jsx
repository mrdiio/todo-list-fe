import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Header from '@/components/ProtectedLayout/Header'
import Footer from '@/components/ProtectedLayout/Footer'

export default async function AuthLayout({ children }) {
  const session = await getServerSession(authOptions)

  if (session?.error === 'RefreshAccessTokenError') {
    redirect('/api/auth/signout')
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header auth={session.user} />

      <main className="flex-1 bg-muted/40 p-4 md:p-6">{children}</main>

      <Footer />
    </div>
  )
}
