'use client'

import type { Session } from 'next-auth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { Report } from '@/lib/api/microcms'
import { useHome } from './useHome'

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
        <h1>レポート一覧</h1>
        {authError === 'unauthorized' && (
          <p>
            このアカウントではログインできません。許可されたドメインのアカウントをご利用ください。
          </p>
        )}
        <p>閲覧するにはログインしてください。</p>
      </section>
    )
  }

  return (
    <section>
      <h1>レポート一覧</h1>
      <p>ログインユーザー: {session?.user?.name}</p>
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
