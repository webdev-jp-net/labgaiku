'use client'

import type { Session } from 'next-auth'
import Link from 'next/link'
import { useInterviewIndex } from './useInterviewIndex'
import styles from './InterviewIndex.module.scss'

export type InterviewListItem = {
  id: string
  title?: string
  guest: string
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
      <h1 className={styles.title}>インタビュー</h1>
      {isAuthenticated && <p className={styles.body}>ログインユーザー: {session?.user?.name}</p>}
      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.canView ? (
              <Link href={`/interview/${item.id}`}>{item.title ?? item.guest}</Link>
            ) : (
              <span>{item.title ?? item.guest}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
