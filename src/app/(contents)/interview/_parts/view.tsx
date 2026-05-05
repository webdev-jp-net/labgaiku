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
  const { isAuthenticated, itemList: list } = useInterviewIndex({ session, itemList })

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <small className={styles.shoulderCopy}>インタビュー</small>
        <h1 className={styles.title}>Labが聞く</h1>
      </header>
      {isAuthenticated && (
        <p className={styles.signedInUser}>ログインユーザー: {session?.user?.name}</p>
      )}
      <ul className={styles.list}>
        {list.map(item => (
          <li key={item.id} className={styles.item}>
            <InterviewItem
              id={item.id}
              title={item.title ?? item.guest}
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
