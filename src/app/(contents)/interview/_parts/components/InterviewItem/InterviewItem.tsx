import type { FC } from 'react'
import Link from 'next/link'
import { formatJaDate } from '@/lib/date'
import { MASK_PLACEHOLDER } from '@/lib/permission'
import styles from './InterviewItem.module.scss'

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
      <span className={styles.title}>{title}</span>
      <span className={styles.guest}>{`${guest}さん`}</span>
      <time className={styles.date} dateTime={canView ? date : undefined}>
        {canView ? formatJaDate(date) : MASK_PLACEHOLDER}
      </time>
    </>
  )

  if (canView) {
    return (
      <Link href={`/interview/${id}`} className={styles.link}>
        {body}
      </Link>
    )
  }
  return <div className={styles.masked}>{body}</div>
}
