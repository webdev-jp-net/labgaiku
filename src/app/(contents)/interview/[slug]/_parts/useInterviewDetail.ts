import { formatJaDate } from '@/lib/date'
import { sanitizeHtml } from '@/lib/sanitize'
import type { IndexNavigationItem } from './components/IndexNavigation/IndexNavigation'
import type { PublicInterview } from './view'

type UseInterviewDetailArgs = {
  interview: PublicInterview
  indexNavigationList: IndexNavigationItem[]
}

export const useInterviewDetail = ({ interview, indexNavigationList }: UseInterviewDetailArgs) => {
  const memberList = (interview.member ?? []).map(m => ({
    name: m.name,
    roll: m.roll,
    tagList: [...(m.isGuest ? ['ゲスト'] : []), ...(m.isFacilitator ? ['ファシリテーター'] : [])],
  }))

  return {
    guestLine: `${interview.guest}さん`,
    dateTime: interview.date,
    formattedDate: interview.date ? formatJaDate(interview.date) : null,
    sanitizedContent: sanitizeHtml(interview.content ?? ''),
    indexNavigationList,
    memberList,
  }
}
