import type { FC, ReactNode } from 'react'
import Link from 'next/link'
import { formatJaDate } from '@/lib/date'
import type { VisibilityLabel } from '@/lib/permission'
import styles from './InterviewItem.module.scss'

type InterviewItemProps = {
  id: string
  title: ReactNode
  guest: string
  date?: string
  canView: boolean
  visibility: VisibilityLabel | null
}

export const InterviewItem: FC<InterviewItemProps> = ({
  id,
  title,
  guest,
  date,
  canView,
  visibility,
}) => {
  const body = (
    <>
      <span className={styles.title}>{title}</span>
      <span className={styles.guest}>
        {guest}
        <small className={styles.suffix}>さん</small>
      </span>
      {(date || visibility) && (
        <div className={styles.meta}>
          {date && (
            <time className={styles.date} dateTime={date}>
              {formatJaDate(date)}
            </time>
          )}
          {visibility && (
            <span className={styles.visibility} aria-label={visibility.ariaLabel}>
              {visibility.label}
            </span>
          )}
        </div>
      )}
    </>
  )

  if (canView) {
    return (
      <Link href={`/interview/${id}`} className={styles.item}>
        {body}
      </Link>
    )
  }
  return <div className={styles.item}>{body}</div>
}
