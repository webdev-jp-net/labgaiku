import type { FC, ReactNode } from 'react'
import styles from './IndexNavigation.module.scss'

export type IndexNavigationItem = {
  id: string
  text: ReactNode
}

type IndexNavigationProps = {
  indexNavigationList: IndexNavigationItem[]
}

export const IndexNavigation: FC<IndexNavigationProps> = ({ indexNavigationList }) => (
  <div className={styles.indexNavigation}>
    <h2 className={styles.title}>index</h2>
    <ul className={styles.list}>
      {indexNavigationList.map(item => (
        <li key={item.id} className={styles.item}>
          <a href={`#${item.id}`} className={styles.link}>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
)
