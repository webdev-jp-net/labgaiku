import type { FC } from 'react'

type IndexNavigationItem = {
  id: string
  text: string
}

type IndexNavigationProps = {
  tocList: IndexNavigationItem[]
}

export const IndexNavigation: FC<IndexNavigationProps> = ({ tocList }) => (
  <ul>
    {tocList.map(item => (
      <li key={item.id}>
        <a href={`#${item.id}`}>{item.text}</a>
      </li>
    ))}
  </ul>
)
