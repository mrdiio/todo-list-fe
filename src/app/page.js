import SignInForm from "@/components/auth/SignInForm";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col justify-center px-5 bg-login">
      <div className="container max-w-lg sm:py-10 p-6 border-none rounded-md bg-white shadow-md">
        <div className="pb-4">
          <span className="text-slate-400">Selamat datang</span>
          <h1 className="text-2xl font-medium text-primary">
            Rekap Pendapatan RS
          </h1>
        </div>

        <SignInForm />
      </div>
    </main>
  )
}
