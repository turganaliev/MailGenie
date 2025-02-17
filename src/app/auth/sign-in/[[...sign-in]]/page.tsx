'use client'

// import { SignIn } from '@clerk/nextjs'

// export default function SignInPage() {
//   return <SignIn />
// }


import { useEffect } from 'react'
import { useAuth, SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn])

  return <SignIn />
}
