'use client'

import type { ReactNode } from 'react'
import type { Interview } from '@/lib/api/microcms'
import { MemberList } from './components/MemberList'
import { IndexNavigation } from './components/IndexNavigation'
import type { IndexNavigationItem } from './components/IndexNavigation/IndexNavigation'
import { useInterviewDetail } from './useInterviewDetail'
import styles from './InterviewDetail.module.scss'

export type PublicInterview = Omit<Interview, 'allowList' | 'visibility'>

type InterviewDetailViewProps = {
  interview: PublicInterview
  indexNavigationList: IndexNavigationItem[]
  heading: ReactNode
}

export function InterviewDetailView({
  interview,
  indexNavigationList: indexNavigationListProp,
  heading,
}: InterviewDetailViewProps) {
  const { guestLine, dateTime, formattedDate, sanitizedContent, indexNavigationList, memberList } =
    useInterviewDetail({ interview, indexNavigationList: indexNavigationListProp })

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.sticky}>
          <h1 className={styles.title}>{heading}</h1>
          <p className={styles.guest}>{guestLine}</p>
          {formattedDate && (
            <time className={styles.date} dateTime={dateTime}>
              {formattedDate}
            </time>
          )}
          <MemberList memberList={memberList} />
          <IndexNavigation indexNavigationList={indexNavigationList} />
        </div>
      </header>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  )
}
