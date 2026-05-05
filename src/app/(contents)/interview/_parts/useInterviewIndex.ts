import type { Session } from 'next-auth'
import type { InterviewListItem } from './view'

type UseInterviewIndexArgs = {
  session: Session | null
  itemList: InterviewListItem[]
}

export type InterviewIndexItem = {
  id: string
  heading: string
  guest: string
  date?: string
  canView: boolean
}

export const useInterviewIndex = ({ session, itemList }: UseInterviewIndexArgs) => {
  return {
    isAuthenticated: Boolean(session),
    signedInUserName: session?.user?.name ?? null,
    items: itemList.map<InterviewIndexItem>(item => ({
      id: item.id,
      heading: item.title ?? item.guest,
      guest: item.guest,
      date: item.date,
      canView: item.canView,
    })),
  }
}
