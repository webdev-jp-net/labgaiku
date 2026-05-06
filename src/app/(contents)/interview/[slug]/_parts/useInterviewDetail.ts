import { formatJaDate } from '@/lib/date'
import { sanitizeHtml } from '@/lib/sanitize'
import type { InterviewTocItem, PublicInterview } from './view'

type UseInterviewDetailArgs = {
  interview: PublicInterview
  toc: InterviewTocItem[]
}

export const useInterviewDetail = ({ interview, toc }: UseInterviewDetailArgs) => {
  const memberList = (interview.member ?? []).map(m => ({
    name: m.name,
    roll: m.roll,
    tagList: [...(m.isGuest ? ['ゲスト'] : []), ...(m.isFacilitator ? ['ファシリテーター'] : [])],
  }))

  return {
    heading: interview.title ?? interview.guest,
    guestLine: `${interview.guest}さん`,
    dateTime: interview.date,
    formattedDate: interview.date ? formatJaDate(interview.date) : null,
    sanitizedContent: sanitizeHtml(interview.content ?? ''),
    toc,
    memberList,
  }
}
