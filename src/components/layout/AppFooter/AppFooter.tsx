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
  const { handleClick, handleKeyDown, label, description } = useAppFooter({ session })

  return (
    <footer className={`${styles.footer} ${className ?? ''}`} {...props}>
      <Link href="/" className={styles.information}>
        <span className={styles.siteName}>Labが行く</span>
        <small className={styles.domain}>labgaiku.org</small>
      </Link>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/interview" className={styles.navLink}>
            <span className={styles.navTitle}>Labが聞く</span>
            <span className={styles.navKana}>interview</span>
          </Link>
        </li>
        {/* <li className={styles.navItem}>
          <Link href="/zine" className={styles.navLink}>
            <span className={styles.navTitle}>人と働く仕組みは設計する</span>
            <span className={styles.navKana}>ZINE</span>
          </Link>
        </li> */}
      </ul>
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
