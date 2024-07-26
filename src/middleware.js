import { withAuth } from 'next-auth/middleware'
import { generateCsp } from './lib/generateCsp'
import { NextResponse } from 'next/server'

// export default withAuth({
//   pages: { signIn: '/' },
// })

export async function middleware(request) {
  // console.log('Middleware executing!')

  // Prepare the CSP headers
  const { contentSecurityPolicyHeaderValue, nonce } = generateCsp()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  // Execute the NextAuth middleware which either returns a redirect response or nothing, if authentication
  // was not required. See source for more: https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/next/middleware.ts#L99
  // If a redirect was returned, use it. Otherwise continue the response normally with NextResponse.next().
  // Omitting the config here, but you can still include it (i.e withAuth(request, { pages: ... }))
  const response =
    (await withAuth(request, {
      pages: { signIn: '/' },
    })) ||
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

  // Set the CSP headers on the response
  requestHeaders.forEach((value, key) => {
    response.headers.append(key, value)
  })

  // console.log('Middleware executed!')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|outside|_next/static|__next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
