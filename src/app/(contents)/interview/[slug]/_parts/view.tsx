'use client'

import type { Interview } from '@/lib/api/microcms'
import { useInterviewDetail } from './useInterviewDetail'
import styles from './InterviewDetail.module.scss'

export type PublicInterview = Omit<Interview, 'allowList' | 'visibility'>

type InterviewDetailViewProps = {
  interview: PublicInterview
}

export function InterviewDetailView({ interview }: InterviewDetailViewProps) {
  const { heading, guestLine, dateTime, formattedDate, sanitizedContent } = useInterviewDetail({
    interview,
  })

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
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  )
}
