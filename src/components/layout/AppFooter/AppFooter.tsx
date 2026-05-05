'use client'

import type { Session } from 'next-auth'
import Link from 'next/link'
import styles from './AppFooter.module.scss'
import { useAppFooter } from './useAppFooter'

interface AppFooterProps extends React.HTMLAttributes<HTMLHeadingElement> {
  session: Session | null
  className?: string
}

export function AppFooter({ session, className, ...props }: AppFooterProps) {
  const { handleClick, label } = useAppFooter({ session })

  return (
    <footer className={`${styles.footer} ${className ?? ''}`} {...props}>
      <Link href="/" className={styles.siteName}>
        Labが行く
      </Link>
      <p className={styles.domain}>labgaiku.org</p>
      <button type="button" onClick={handleClick} className={styles.login}>
        {label}
      </button>
    </footer>
  )
}
