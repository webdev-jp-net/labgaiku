'use client'

import { useEffect, type ComponentProps, type ReactNode } from 'react'
import { useSetAtom } from 'jotai'
import { indexNavigationAtom } from '@/data/store'
import type { VisibilityLabel } from '@/lib/permission'
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
  visibility: VisibilityLabel | null
}

export function InterviewDetailView({
  heading,
  guest,
  dateTime,
  formattedDate,
  sanitizedContent,
  indexNavigationList,
  memberList,
  visibility,
}: InterviewDetailViewProps) {
  const setIndexNavigationList = useSetAtom(indexNavigationAtom)
  useEffect(() => {
    setIndexNavigationList(indexNavigationList)
    return () => setIndexNavigationList([])
  }, [indexNavigationList, setIndexNavigationList])

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.sticky}>
          <div>
            <h1 className={styles.title}>{heading}</h1>
            <p className={styles.guest}>
              {guest}
              <small className={styles.suffix}>さん</small>
            </p>
            {(formattedDate || visibility) && (
              <div className={styles.meta}>
                {formattedDate && (
                  <time className={styles.date} dateTime={dateTime}>
                    {formattedDate}
                  </time>
                )}
                {visibility && (
                  <span className={styles.visibility} aria-label={visibility.ariaLabel}>
                    {visibility.label}
                  </span>
                )}
              </div>
            )}
          </div>
          <MemberList memberList={memberList} />
          <IndexNavigation indexNavigationList={indexNavigationList} />
        </div>
      </header>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  )
}
