import Link from 'next/link'
import styles from './AppHeader.module.scss'

interface AppHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export function AppHeader({ className, ...props }: AppHeaderProps) {
  return (
    <header className={`${styles.header} ${className ?? ''}`} {...props}>
      <Link href="/" className={styles.siteName}>
        Labが行く
      </Link>
    </header>
  )
}
