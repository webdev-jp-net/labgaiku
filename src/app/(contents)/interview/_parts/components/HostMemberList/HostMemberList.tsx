import type { FC } from 'react'
import { Haitani } from './images/Haitani'
import { Iha } from './images/Iha'
import { Tsunokawa } from './images/Tsunokawa'
import styles from './HostMemberList.module.scss'

export const HostMemberList: FC = () => (
  <div className={styles.root}>
    <h3 className={styles.title}>Host members</h3>
    <ul className={styles.list}>
      <li className={styles.item}>
        <figure className={styles.figure}>
          <Haitani className={styles.image} />
        </figure>
        <div>
          <div className={styles.name}>
            灰谷<small>FE・エンジニア</small>
          </div>
          <p className={styles.description}>思いつきで企画をつくる人。話が散らかっている。</p>
        </div>
      </li>
      <li className={styles.item}>
        <figure className={styles.figure}>
          <Tsunokawa className={styles.image} />
        </figure>
        <div>
          <div className={styles.name}>
            角川<small>FE・エンジニア</small>
          </div>
          <p className={styles.description}>あいずち番長。絶妙なところで「うん」と言う。</p>
        </div>
      </li>
      <li className={styles.item}>
        <figure className={styles.figure}>
          <Iha className={styles.image} />
        </figure>
        <div>
          <div className={styles.name}>
            伊波<small>SRE・エンジニア</small>
          </div>
          <p className={styles.description}>知りたがりでアツい。トークがいちばん上手い。</p>
        </div>
      </li>
    </ul>
  </div>
)
