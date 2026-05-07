import { useEffect, type KeyboardEvent } from 'react'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import type { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

type UseAppFooterArgs = {
  session: Session | null
}

export const useAppFooter = ({ session }: UseAppFooterArgs) => {
  const isAuthenticated = Boolean(session)

  const handleClick = () => {
    if (isAuthenticated) {
      void signOut()
    } else {
      void signIn('google')
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handleClick()
  }

  const label = isAuthenticated ? 'ログアウト' : 'ログイン'

  const description = isAuthenticated
    ? (session?.user?.name ?? '')
    : '一部、認証による限定公開コンテンツがあります。'

  const [ref, entry] = useIntersectionObserver({ threshold: 0 })
  const isVisible = Boolean(entry?.isIntersecting)

  useEffect(() => {
    if (isVisible) {
      delete document.documentElement.dataset.visibleNav
    } else {
      document.documentElement.dataset.visibleNav = ''
    }
    return () => {
      document.documentElement.dataset.visibleNav = ''
    }
  }, [isVisible])

  return { handleClick, handleKeyDown, label, description, ref }
}
