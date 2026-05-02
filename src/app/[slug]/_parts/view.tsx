'use client'

import type { Report } from '@/lib/api/microcms'
import { sanitizeHtml } from '@/lib/sanitize'
import styles from './view.module.scss'

type ReportArticleViewProps = {
  report: Report
}

export function ReportArticleView({ report }: ReportArticleViewProps) {
  return (
    <article className={styles.article}>
      <header>
        <h1 className={styles.title}>{report.title ?? report.guest}</h1>
        {report.date && (
          <time className={styles.date} dateTime={report.date}>
            {report.date}
          </time>
        )}
      </header>
      <section>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(report.content ?? ''),
          }}
        />
      </section>
    </article>
  )
}
