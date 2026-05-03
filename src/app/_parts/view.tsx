'use client'

import type { Session } from 'next-auth'
import Link from 'next/link'
import { useHome } from './useHome'
import styles from './view.module.scss'

export type InterviewListItem = {
  id: string
  title?: string
  guest: string
  canView: boolean
}

type HomeViewProps = {
  session: Session | null
  itemList: InterviewListItem[]
}

export function HomeView({ session, itemList }: HomeViewProps) {
  const { isAuthenticated, itemList: list } = useHome({ session, itemList })

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>インタビュー一覧</h1>
      {isAuthenticated && <p className={styles.body}>ログインユーザー: {session?.user?.name}</p>}
      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.canView ? (
              <Link href={`/${item.id}`}>{item.title ?? item.guest}</Link>
            ) : (
              <span>{item.title ?? item.guest}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
