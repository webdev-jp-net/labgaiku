import type { FC } from 'react'
import styles from './IndexNavigation.module.scss'
import { WordUnit } from '@/components/WordUnit'

type IndexNavigationItem = {
  id: string
  text: string
}

type IndexNavigationProps = {
  tocList: IndexNavigationItem[]
}

export const IndexNavigation: FC<IndexNavigationProps> = ({ tocList }) => (
  <div className={styles.indexNavigation}>
    <h2 className={styles.title}>index</h2>
    <ul className={styles.list}>
      {tocList.map(item => (
        <li key={item.id} className={styles.item}>
          <a href={`#${item.id}`} className={styles.link}>
            <WordUnit>{item.text}</WordUnit>
          </a>
        </li>
      ))}
    </ul>
  </div>
)
