'use client'

import type { Session } from 'next-auth'
import Link from 'next/link'
import { ContentsMenu } from '@/components/ContentsMenu'
import styles from './AppFooter.module.scss'
import { useAppFooter } from './useAppFooter'

interface AppFooterProps extends React.HTMLAttributes<HTMLElement> {
  session: Session | null
  className?: string
}

export function AppFooter({ session, className, ...props }: AppFooterProps) {
  const { handleClick, handleKeyDown, label, description } = useAppFooter({ session })

  return (
    <footer className={`${styles.footer} ${className ?? ''}`} {...props}>
      <Link href="/" className={styles.information}>
        <span className={styles.siteName}>Labが行く</span>
        <small className={styles.domain}>labgaiku.org</small>
      </Link>
      <ContentsMenu className={styles.nav} />
      <div className={styles.console}>
        <p className={styles.consoleDescription}>{description}</p>
        <span
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={styles.login}
        >
          {label}
        </span>
      </div>
    </footer>
  )
}
