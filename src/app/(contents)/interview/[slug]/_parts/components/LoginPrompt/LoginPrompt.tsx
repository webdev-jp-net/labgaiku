'use client'

import type { FC, ReactNode } from 'react'
import type { VisibilityLabel } from '@/lib/permission'
import detailStyles from '../../InterviewDetail.module.scss'
import styles from './LoginPrompt.module.scss'
import { useLoginPrompt } from './useLoginPrompt'

type LoginPromptProps = {
  callbackUrl: string
  heading: ReactNode
  dateTime?: string
  formattedDate: string | null
  visibility: VisibilityLabel | null
}

export const LoginPrompt: FC<LoginPromptProps> = ({
  callbackUrl,
  heading,
  dateTime,
  formattedDate,
  visibility,
}) => {
  const { handleClick, handleKeyDown } = useLoginPrompt({ callbackUrl })

  return (
    <article className={detailStyles.article}>
      <header className={detailStyles.header}>
        <div className={detailStyles.sticky}>
          <div>
            <h1 className={detailStyles.title}>{heading}</h1>
            {(formattedDate || visibility) && (
              <div className={detailStyles.meta}>
                {formattedDate && (
                  <time className={detailStyles.date} dateTime={dateTime}>
                    {formattedDate}
                  </time>
                )}
                {visibility && (
                  <span className={detailStyles.visibility} aria-label={visibility.ariaLabel}>
                    {visibility.label}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      <div className={styles.body}>
        <p className={styles.paragraph}>
          このインタビューは限定公開です。
          <br />
          権限のあるアカウントで
          <span
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={styles.link}
          >
            ログイン
          </span>
          すると閲覧できます。
        </p>
      </div>
    </article>
  )
}
