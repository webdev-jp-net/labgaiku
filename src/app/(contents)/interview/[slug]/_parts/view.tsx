'use client'

import type { Interview } from '@/lib/api/microcms'
import { formatJaDate } from '@/lib/date'
import { sanitizeHtml } from '@/lib/sanitize'
import styles from './InterviewDetail.module.scss'

export type PublicInterview = Omit<Interview, 'allowList' | 'visibility'>

type InterviewDetailViewProps = {
  interview: PublicInterview
}

export function InterviewDetailView({ interview }: InterviewDetailViewProps) {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{interview.title ?? interview.guest}</h1>
        <p className={styles.guest}>{interview.guest}さん</p>
        {interview.date && (
          <time className={styles.date} dateTime={interview.date}>
            {formatJaDate(interview.date)}
          </time>
        )}
      </header>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(interview.content ?? ''),
        }}
      />
    </article>
  )
}
