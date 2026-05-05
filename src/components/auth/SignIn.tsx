'use client'

import { useCallback } from 'react'
import { signIn } from 'next-auth/react'

export function SignIn() {
  const handleClick = useCallback(() => {
    void signIn('google', { callbackUrl: '/' })
  }, [])

  return (
    <button type="button" onClick={handleClick}>
      Googleでサインイン
    </button>
  )
}
