import { getServerSession } from 'next-auth'
import { getInterviewList } from '@/lib/api/microcms'
import { authOptions } from '@/lib/auth'
import { canViewInterview, getVisibilityLabel, MASK_PLACEHOLDER } from '@/lib/permission'
import { InterviewTitle } from '@/components/InterviewTitle'
import { InterviewIndexView } from './_parts/view'
import type { InterviewListItem } from './_parts/view'

export default async function InterviewIndexPage() {
  const session = await getServerSession(authOptions)

  try {
    const interviewList = await getInterviewList({ orders: '-date' })
    const itemList: InterviewListItem[] = interviewList
      .filter(interview => {
        if (interview.visibility.includes('secret')) {
          return canViewInterview(interview, session)
        }
        return true
      })
      .map(interview => {
        const canView = canViewInterview(interview, session)
        const titleSource = canView ? (interview.title ?? interview.guest) : interview.title
        return {
          id: interview.id,
          title: titleSource ? <InterviewTitle>{titleSource}</InterviewTitle> : MASK_PLACEHOLDER,
          guest: canView ? interview.guest : MASK_PLACEHOLDER,
          date: interview.date,
          visibility: getVisibilityLabel(interview.visibility),
        }
      })
    return <InterviewIndexView itemList={itemList} />
  } catch {
    return <InterviewIndexView itemList={[]} />
  }
}
