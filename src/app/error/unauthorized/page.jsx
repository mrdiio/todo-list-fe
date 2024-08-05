'use client'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export default function UnauthorizedPage() {
  const router = useRouter()
  const params = useSearchParams()

  return (
    <div>
      Error: {params?.get('message')}
      <Button onClick={() => router.push('/')}>Kembali</Button>
    </div>
  )
}
