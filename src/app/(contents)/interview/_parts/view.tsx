'use client'

import type { ReactNode } from 'react'
import type { VisibilityLabel } from '@/lib/permission'
import { InterviewItem } from './components/InterviewItem'
import { Haitani } from './images/Haitani'
import { Iha } from './images/Iha'
import { Tsunokawa } from './images/Tsunokawa'
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
          <div className={styles.member}>
            <h3 className={styles.memberTitle}>Host members</h3>
            <ul className={styles.memberList}>
              <li className={styles.memberItem}>
                <figure className={styles.memberFigure}>
                  <Haitani className={styles.memberImage} />
                </figure>
                <div>
                  <div className={styles.memberName}>
                    灰谷<small>FE・エンジニア</small>
                  </div>
                  <p className={styles.memberDescription}>
                    いろいろ思いついて企画をつくる人。話が長い。
                  </p>
                </div>
              </li>
              <li className={styles.memberItem}>
                <figure className={styles.memberFigure}>
                  <Tsunokawa className={styles.memberImage} />
                </figure>
                <div>
                  <div className={styles.memberName}>
                    角川<small>FE・エンジニア</small>
                  </div>
                  <p className={styles.memberDescription}>
                    あいずち番長。絶妙なところで「うん」と言う。
                  </p>
                </div>
              </li>
              <li className={styles.memberItem}>
                <figure className={styles.memberFigure}>
                  <Iha className={styles.memberImage} />
                </figure>
                <div>
                  <div className={styles.memberName}>
                    伊波<small>SRE・エンジニア</small>
                  </div>
                  <p className={styles.memberDescription}>
                    知りたがりでアツい。トークが一番うまい。
                  </p>
                </div>
              </li>
            </ul>
          </div>
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
