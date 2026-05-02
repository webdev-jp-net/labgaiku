'use client'

import type { Session } from 'next-auth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { Report } from '@/lib/api/microcms'
import { useHome } from './useHome'
import styles from './view.module.scss'

type HomeViewProps = {
  session: Session | null
  reports: Report[]
}

export function HomeView({ session, reports }: HomeViewProps) {
  const searchParams = useSearchParams()
  const authError = searchParams.get('error')
  const { isAuthenticated, reports: reportList } = useHome({ session, reports })

  if (!isAuthenticated) {
    return (
      <section>
        <h1 className={styles.title}>レポート一覧</h1>
        {authError === 'unauthorized' && (
          <p className={styles.body}>
            このアカウントではログインできません。許可されたドメインのアカウントをご利用ください。
          </p>
        )}
        <p className={styles.body}>閲覧するにはログインしてください。</p>
      </section>
    )
  }

  return (
    <section>
      <h1 className={styles.title}>レポート一覧</h1>
      <p className={styles.body}>ログインユーザー: {session?.user?.name}</p>
      <ul>
        {reportList.map(report => (
          <li key={report.id}>
            <Link href={`/${report.id}`}>{report.title ?? report.guest}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
