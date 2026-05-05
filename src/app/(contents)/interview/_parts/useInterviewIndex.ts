import type { InterviewListItem } from './view'

type UseInterviewIndexArgs = {
  itemList: InterviewListItem[]
}

export type InterviewIndexItem = {
  id: string
  heading: string
  guest: string
  date?: string
  canView: boolean
}

export const useInterviewIndex = ({ itemList }: UseInterviewIndexArgs) => {
  return {
    items: itemList.map<InterviewIndexItem>(item => ({
      id: item.id,
      heading: item.title ?? item.guest,
      guest: item.guest,
      date: item.date,
      canView: item.canView,
    })),
  }
}
