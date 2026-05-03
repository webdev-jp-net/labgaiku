import type { Session } from 'next-auth'
import type { InterviewListItem } from './view'

type UseHomeArgs = {
  session: Session | null
  itemList: InterviewListItem[]
}

export const useHome = ({ session, itemList }: UseHomeArgs) => {
  return {
    isAuthenticated: Boolean(session),
    itemList,
  }
}
