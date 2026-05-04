'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import styles from './AppFooter.module.scss'

interface AppFooterProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export function AppFooter({ className, ...props }: AppFooterProps) {
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
    <footer className={`${styles.footer} ${className}`} {...props}>
      <Link href="/" className={styles.siteName}>
        Labが行く
      </Link>
      <button type="button" onClick={handleClick} className={styles.login}>
        {label}
      </button>
    </footer>
  )
}
