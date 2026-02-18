'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import styles from './AppHeader.module.scss'

export function AppHeader() {
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
    <header className={styles.header}>
      <Link href="/" className={styles.siteName}>
        TAMSAN Lab
      </Link>
      <button type="button" onClick={handleClick} className={styles.login}>
        {label}
      </button>
    </header>
  )
}

"
ポイントのところ
本実装に転用可能かどうか

TBS様で、他の理由があって

"