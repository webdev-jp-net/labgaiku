import type { FC } from 'react'
import Link from 'next/link'
import { formatJaDate } from '@/lib/date'
import styles from './InterviewItem.module.scss'
import { WordUnit } from '@/components/WordUnit'

type InterviewItemProps = {
  id: string
  title: string
  guest: string
  date?: string
  canView: boolean
}

export const InterviewItem: FC<InterviewItemProps> = ({ id, title, guest, date, canView }) => {
  const body = (
    <>
      <span className={styles.title}>
        <WordUnit>{title}</WordUnit>
      </span>
      <span className={styles.guest}>
        {guest}
        <small className={styles.suffix}>さん</small>
      </span>
      {date && (
        <time className={styles.date} dateTime={date}>
          {formatJaDate(date)}
        </time>
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
