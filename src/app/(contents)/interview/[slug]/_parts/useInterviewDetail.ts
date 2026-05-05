import { formatJaDate } from '@/lib/date'
import { sanitizeHtml } from '@/lib/sanitize'
import type { PublicInterview } from './view'

type UseInterviewDetailArgs = {
  interview: PublicInterview
}

export const useInterviewDetail = ({ interview }: UseInterviewDetailArgs) => {
  return {
    heading: interview.title ?? interview.guest,
    guestLine: `${interview.guest}さん`,
    dateTime: interview.date,
    formattedDate: interview.date ? formatJaDate(interview.date) : null,
    sanitizedContent: sanitizeHtml(interview.content ?? ''),
  }
}
