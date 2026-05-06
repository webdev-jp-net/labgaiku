'use client'

import type { ReactNode } from 'react'
import type { VisibilityLabel } from '@/lib/permission'
import { HostMemberList } from './components/HostMemberList'
import { InterviewItem } from './components/InterviewItem'
import { useInterviewIndex } from './useInterviewIndex'
import styles from './InterviewIndex.module.scss'

export type InterviewListItem = {
  id: string
  title: ReactNode
  guest: string
  date?: string
  visibility: VisibilityLabel | null
}

type InterviewIndexViewProps = {
  itemList: InterviewListItem[]
}

export function InterviewIndexView({ itemList }: InterviewIndexViewProps) {
  const { items } = useInterviewIndex({ itemList })

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div className={styles.sticky}>
          <h1 className={styles.title}>Labが聞く</h1>
          <small className={styles.kana}>interview</small>
          <p className={styles.description}>
            人の話をしっかり聞く、それがただただ深い。
            <br />
            考えていることや感じていること、そこには生き方や人となりが息づいています。
            形式知にはおさまらないソフトスキルの学びへようこそ。
          </p>
          <HostMemberList />
        </div>
      </header>
      <div className={styles.body}>
        <ul className={styles.list}>
          {items.map(item => (
            <li key={item.id} className={styles.item}>
              <InterviewItem
                id={item.id}
                title={item.heading}
                guest={item.guest}
                date={item.date}
                visibility={item.visibility}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
