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
  const { handleClick, handleKeyDown, isAuthenticated, userName } = useAppFooter({ session })

  return (
    <footer className={`${styles.footer} ${className ?? ''}`} {...props}>
      <div className={styles.layout}>
        <Link href="/" className={styles.information}>
          <span className={styles.siteName}>Labが行く</span>
          <small className={styles.domain}>labgaiku.org</small>
        </Link>
        <ContentsMenu className={styles.nav} />
        <div className={styles.console}>
          <p className={styles.consoleDescription}>
            {isAuthenticated ? (
              userName
            ) : (
              <>
                インタビューの一部は
                <br />
                認証による限定公開です
              </>
            )}
          </p>
          <span
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={styles.login}
          >
            {isAuthenticated ? 'ログアウト' : 'ログイン'}
          </span>
        </div>
        <small className={styles.copyright}>© 2026 Labが行く</small>
      </div>
    </footer>
  )
}
