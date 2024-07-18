export default function AuthLayout({ children }) {
  return (
    <div className="grid flex-grow w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          Auth Layout
          {children}
        </main>
      </div>
    </div>
  )
}
