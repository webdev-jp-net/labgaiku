'use client'

import type { Interview } from '@/lib/api/microcms'
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
      {memberList.length > 0 && (
        <ul>
          {memberList.map(member => (
            <li key={member.name}>
              <span>{member.name}</span>
              <span>{member.roll}</span>
              {member.tagList.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </li>
          ))}
        </ul>
      )}
      <ul>
        {tocList.map(item => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  )
}
