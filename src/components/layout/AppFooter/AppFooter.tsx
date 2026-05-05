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
  const { handleClick, handleKeyDown, label } = useAppFooter({ session })

  return (
    <footer className={`${styles.footer} ${className ?? ''}`} {...props}>
      <Link href="/" className={styles.siteName}>
        Labが行く
      </Link>
      <p className={styles.domain}>labgaiku.org</p>
      <span
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={styles.login}
      >
        {label}
      </span>
    </footer>
  )
}
