import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from './sessionProvider'
import QueryProvider from './queryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <QueryProvider>
            <div className="min-h-screen flex flex-col">{children}</div>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
