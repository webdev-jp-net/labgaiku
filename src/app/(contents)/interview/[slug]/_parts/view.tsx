'use client'

import type { Interview } from '@/lib/api/microcms'
import { MemberList } from './components/MemberList'
import { IndexNavigation } from './components/IndexNavigation'
import { useInterviewDetail } from './useInterviewDetail'
import styles from './InterviewDetail.module.scss'

export type PublicInterview = Omit<Interview, 'allowList' | 'visibility'>

export type InterviewTocItem = {
  id: string
  text: string
}

type InterviewDetailViewProps = {
  interview: PublicInterview
  toc: InterviewTocItem[]
}

export function InterviewDetailView({ interview, toc }: InterviewDetailViewProps) {
  const {
    heading,
    guestLine,
    dateTime,
    formattedDate,
    sanitizedContent,
    toc: tocList,
    memberList,
  } = useInterviewDetail({ interview, toc })

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{heading}</h1>
        <p className={styles.guest}>{guestLine}</p>
        {formattedDate && (
          <time className={styles.date} dateTime={dateTime}>
            {formattedDate}
          </time>
        )}
      </header>
      <MemberList memberList={memberList} />
      <IndexNavigation tocList={tocList} />

      <div className={styles.body} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  )
}
