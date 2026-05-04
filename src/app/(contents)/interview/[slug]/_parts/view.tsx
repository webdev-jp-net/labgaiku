'use client'

import type { Interview } from '@/lib/api/microcms'
import { sanitizeHtml } from '@/lib/sanitize'
import styles from './view.module.scss'

export type PublicInterview = Omit<Interview, 'allowList' | 'visibility'>

type InterviewArticleViewProps = {
  interview: PublicInterview
}

export function InterviewArticleView({ interview }: InterviewArticleViewProps) {
  return (
    <article className={styles.article}>
      <header>
        <h1 className={styles.title}>{interview.title ?? interview.guest}</h1>
        {interview.date && (
          <time className={styles.date} dateTime={interview.date}>
            {interview.date}
          </time>
        )}
      </header>
      <section>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(interview.content ?? ''),
          }}
        />
      </section>
    </article>
  )
}
