'use client'

import type { FC } from 'react'
import styles from './LoginPrompt.module.scss'
import { useLoginPrompt } from './useLoginPrompt'

type LoginPromptProps = {
  callbackUrl: string
}

export const LoginPrompt: FC<LoginPromptProps> = ({ callbackUrl }) => {
  const { handleClick, handleKeyDown } = useLoginPrompt({ callbackUrl })

  return (
    <section className={styles.section}>
      <p className={styles.paragraph}>
        この記事は限定公開です。
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
    </section>
  )
}
