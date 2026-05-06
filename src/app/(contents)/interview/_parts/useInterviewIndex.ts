import type { ReactNode } from 'react'
import type { VisibilityLabel } from '@/lib/permission'
import type { InterviewListItem } from './view'

type UseInterviewIndexArgs = {
  itemList: InterviewListItem[]
}

export type InterviewIndexItem = {
  id: string
  heading: ReactNode
  guest: string
  date?: string
  visibility: VisibilityLabel | null
}

export const useInterviewIndex = ({ itemList }: UseInterviewIndexArgs) => {
  return {
    items: itemList.map<InterviewIndexItem>(item => ({
      id: item.id,
      heading: item.title,
      guest: item.guest,
      date: item.date,
      visibility: item.visibility,
    })),
  }
}
