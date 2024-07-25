import { headers } from 'next/headers'
import Script from 'next/script'

export default async function DashboardPage() {
  // const nonce = headers().get('x-nonce')

  return (
    <div>
      DashboardPage
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js"
        strategy="afterInteractive"
        nonce={nonce}
      /> */}
    </div>
  )
}
