import type { KeyboardEvent } from 'react'
import { signIn } from 'next-auth/react'

type UseLoginPromptArgs = {
  callbackUrl: string
}

export const useLoginPrompt = ({ callbackUrl }: UseLoginPromptArgs) => {
  const handleClick = () => {
    void signIn('google', { callbackUrl })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    void signIn('google', { callbackUrl })
  }

  return { handleClick, handleKeyDown }
}
