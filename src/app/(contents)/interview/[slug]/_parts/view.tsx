'use client'

import type { ComponentProps, ReactNode } from 'react'
import { MemberList } from './components/MemberList'
import { IndexNavigation } from './components/IndexNavigation'
import type { IndexNavigationItem } from './components/IndexNavigation/IndexNavigation'
import styles from './InterviewDetail.module.scss'

type InterviewDetailViewProps = {
  heading: ReactNode
  guest: string
  dateTime?: string
  formattedDate: string | null
  sanitizedContent: string
  indexNavigationList: IndexNavigationItem[]
  memberList: ComponentProps<typeof MemberList>['memberList']
}

export function InterviewDetailView({
  heading,
  guest,
  dateTime,
  formattedDate,
  sanitizedContent,
  indexNavigationList,
  memberList,
}: InterviewDetailViewProps) {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.sticky}>
          <h1 className={styles.title}>{heading}</h1>
          <p className={styles.guest}>
            {guest}
            <small className={styles.suffix}>さん</small>
          </p>
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
