'use client'

import type { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import styles from './AppHeader.module.scss'

interface AppHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  session: Session | null
  className?: string
}

export function AppHeader({ session, className, ...props }: AppHeaderProps) {
  const isAuthenticated = Boolean(session)

  const handleClick = () => {
    if (isAuthenticated) {
      void signOut()
    } else {
      void signIn('google')
    }
  }

  const label = isAuthenticated ? 'ログアウト' : 'ログイン'

  return (
    <header className={`${styles.header} ${className ?? ''}`} {...props}>
      <Link href="/" className={styles.siteName}>
        Labが行く
      </Link>
      <button type="button" onClick={handleClick} className={styles.login}>
        {label}
      </button>
    </header>
  )
}
