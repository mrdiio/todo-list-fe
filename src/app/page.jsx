import SignInForm from '@/components/auth/SignInForm'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard')

  return (
    <main className="flex-grow flex flex-col justify-center px-5">
      <div className="container max-w-lg sm:py-10 p-6 border-none rounded-md bg-white shadow-md">
        <div className="pb-4">
          <span className="text-slate-400">Welcome</span>
          <h1 className="text-2xl font-medium text-primary">
            Sign in to your account
          </h1>
        </div>

        <SignInForm />
      </div>
    </main>
  )
}
