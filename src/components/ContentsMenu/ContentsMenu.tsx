'use client'

import Link from 'next/link'
import styles from './ContentsMenu.module.scss'
import { useContentsMenu } from './useContentsMenu'

type ContentsMenuProps = React.HTMLAttributes<HTMLUListElement> & {
  className?: string
}

export const ContentsMenu = ({ className, ...props }: ContentsMenuProps) => {
  const ref = useContentsMenu()
  return (
    <ul ref={ref} className={`${styles.contentsMenu} ${className ?? ''}`} {...props}>
      <li className={styles.item}>
        <Link href="/interview" className={styles.link}>
          <span className={styles.title}>Labが聞く</span>
          <span className={styles.kana}>interview</span>
        </Link>
      </li>
      {/* <li className={styles.item}>
        <Link href="/zine" className={styles.link}>
          <span className={styles.title}>人と働く仕組みは設計する</span>
          <span className={styles.kana}>ZINE</span>
        </Link>
      </li> */}
    </ul>
  )
}
