'use client'

// import { SignUp } from '@clerk/nextjs'

// export default function SignUpPage() {
//   return <SignUp />
// }

import { useEffect } from 'react'
import { useAuth, SignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])  // Include `router` in the dependency array for best practices

  return <SignUp />
}

