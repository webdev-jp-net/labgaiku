import type { FC } from 'react'
import styles from './IndexNavigation.module.scss'

type IndexNavigationItem = {
  id: string
  text: string
}

type IndexNavigationProps = {
  tocList: IndexNavigationItem[]
}

export const IndexNavigation: FC<IndexNavigationProps> = ({ tocList }) => (
  <div className={styles.indexNavigation}>
    <h2 className={styles.title}>INDEX</h2>
    <ul className={styles.list}>
      {tocList.map(item => (
        <li key={item.id} className={styles.item}>
          <a href={`#${item.id}`} className={styles.link}>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
)
