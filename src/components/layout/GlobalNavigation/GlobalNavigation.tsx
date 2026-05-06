import Link from 'next/link'
import styles from './GlobalNavigation.module.scss'

interface GlobalNavigationProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export function GlobalNavigation({ className, ...props }: GlobalNavigationProps) {
  return (
    <nav className={`${styles.globalNavigation} ${className ?? ''}`} {...props}>
      <Link href="/" className={styles.siteName}>
        Labが行く
      </Link>
    </nav>
  )
}
