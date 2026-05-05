'use client'

import type { Session } from 'next-auth'
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
  session: Session | null
  itemList: InterviewListItem[]
}

export function InterviewIndexView({ session, itemList }: InterviewIndexViewProps) {
  const { isAuthenticated, signedInUserName, items } = useInterviewIndex({ session, itemList })

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <small className={styles.shoulderCopy}>インタビュー</small>
        <h1 className={styles.title}>Labが聞く</h1>
      </header>
      {isAuthenticated && (
        <p className={styles.signedInUser}>ログインユーザー: {signedInUserName}</p>
      )}
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
