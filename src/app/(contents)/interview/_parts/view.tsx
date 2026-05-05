'use client'

import { InterviewItem } from './components/InterviewItem'
import { useInterviewIndex } from './useInterviewIndex'
import styles from './InterviewIndex.module.scss'

export type InterviewListItem = {
  id: string
  title?: string
  guest: string
  date?: string
  canView: boolean
}

type InterviewIndexViewProps = {
  itemList: InterviewListItem[]
}

export function InterviewIndexView({ itemList }: InterviewIndexViewProps) {
  const { items } = useInterviewIndex({ itemList })

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <small className={styles.shoulderCopy}>インタビュー</small>
        <h1 className={styles.title}>Labが聞く</h1>
      </header>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id} className={styles.item}>
            <InterviewItem
              id={item.id}
              title={item.heading}
              guest={item.guest}
              date={item.date}
              canView={item.canView}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
