import type { Session } from 'next-auth'
import type { InterviewListItem } from './view'

type UseInterviewIndexArgs = {
  session: Session | null
  itemList: InterviewListItem[]
}

export const useInterviewIndex = ({ session, itemList }: UseInterviewIndexArgs) => {
  return {
    isAuthenticated: Boolean(session),
    itemList,
  }
}
