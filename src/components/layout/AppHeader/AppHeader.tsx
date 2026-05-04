'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import styles from './AppHeader.module.scss'

interface AppHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export function AppHeader({ className, ...props }: AppHeaderProps) {
  const { status } = useSession()

  const handleClick = () => {
    if (status === 'authenticated') {
      void signOut({ callbackUrl: '/' })
    } else {
      void signIn('google', { callbackUrl: '/' })
    }
  }

  const label = status === 'authenticated' ? 'ログアウト' : 'ログイン'

  return (
    <header className={`${styles.header} ${className}`} {...props}>
      <Link href="/" className={styles.siteName}>
        Labが行く
      </Link>
      <button type="button" onClick={handleClick} className={styles.login}>
        {label}
      </button>
    </header>
  )
}
