import type { FC } from 'react'
import styles from './MemberList.module.scss'

type Member = {
  name: string
  roll: string
  tagList: string[]
}

type MemberListProps = React.HTMLAttributes<HTMLDivElement> & {
  memberList: Member[]
}

export const MemberList: FC<MemberListProps> = ({ memberList, ...props }) => {
  if (memberList.length === 0) return null
  return (
    <div className={`${styles.memberList} ${props.className ?? ''}`} {...props}>
      <h2 className={styles.title}>
        member<small>敬称略</small>
      </h2>
      <ul className={styles.list}>
        {memberList.map(member => (
          <li key={member.name} className={styles.item}>
            <span>
              <span className={styles.name}>{member.name}</span>
              <span className={styles.roll}>（{member.roll}）</span>
              {member.tagList.map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
