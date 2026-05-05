import type { FC } from 'react'

type Member = {
  name: string
  roll: string
  tagList: string[]
}

type MemberListProps = {
  memberList: Member[]
}

export const MemberList: FC<MemberListProps> = ({ memberList }) => {
  if (memberList.length === 0) return null
  return (
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
  )
}
